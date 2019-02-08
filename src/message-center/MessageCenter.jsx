import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { getExchanges } from './api.js'
import messages from '../auth/messages.js'
import './MessageCenter.scss'


class MessageCenter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: props.getUser()
    }

    // load exchange data from API
    this.refresh()

    // set an interval to call refresh periodically
    this.interval = setInterval(this.refresh, 5000)
  }

  componentWillUnmount() {
    clearInterval(this.interval) // clear automatic refresh
  }

  // handleClick() is called if a user clicks on a particular exchange;
  // it redirects them to ExchangeView with that particular exchange's info
  // loaded
  handleClick = (event) => {
    const { getUser, history, setUser } = this.props

    const user = getUser()
    user.currentExchange = event.currentTarget.getAttribute('exchangeid')
    setUser(user)
    history.push('/exchange')
  }

  // refresh() loads all of the exchanges from the API, and displays the ones
  // that belong to the current user
  refresh = () => {
    getExchanges(this.state.user)
      .then(res => res.json())
      // filter out exchanges that don't belong to current user
      .then(res => {
        const exchanges = res.exchanges.filter(exchange => exchange.messages.length > 0 && ((this.state.user.client && exchange.client.id === this.state.user.client.id)
           || (this.state.user.sitter && exchange.sitter.id === this.state.user.sitter.id)))
        return exchanges
      })
      // sort the current user's exchanges by date, then load them into this
      // component's state
      .then(exchanges => {
        const currentUserExchanges = exchanges
        currentUserExchanges.sort((a, b) => new Date(b.messages[b.messages.length - 1].created_at) - new Date(a.messages[a.messages.length - 1].created_at))
        this.setState({ currentUserExchanges: currentUserExchanges })
      })
      .then(() => this.mapRows())
      .catch(() => this.flash(messages.cannotReachServer, 'flash-error'))
  }

  // mapRows() is used to create table rows using the exhcnage data; the rows
  // are then displayed as part of the table in this component's render method
  mapRows = () => {
    const rows = this.state.currentUserExchanges.map((exchange, index) => {
      // for each exchange, display part of the most recent message in the table
      const lastMessage = exchange.messages[exchange.messages.length - 1]
      if (lastMessage) {
        // if the lastMessage has been read and/or was written by current user,
        // color the row blue; else, color it white
        const colorClass = lastMessage.read || lastMessage.user_id === this.state.user.id ? 'table-info d-flex' : 'd-flex'
        // display the date of the most recent message--if it's today, just
        // display the time
        let datetime = new Date(lastMessage.created_at)
        datetime.toDateString() === new Date().toDateString()
          ? datetime = datetime.toLocaleTimeString('en-US')
          : datetime = `${new Intl.DateTimeFormat('en-US', { month: 'long' }).format(datetime)} ${datetime.getDate()}, ${datetime.getFullYear()}`
        return (
          <tr key={index} className={colorClass} onClick={this.handleClick} exchangeid={exchange.id}>
            <td className="col-2">{this.state.user.client.id === exchange.client.id ? exchange.sitter.user.name : exchange.client.user.name}</td>
            <td className="col-8 last-message">{lastMessage.content}</td>
            <td className="col-2">{datetime}</td>
          </tr>
        )
      } else {
        return null
      }
    })
    this.setState({ rows })
  }

  render() {
    return (
      <div className="auth-form">
        <h3>Message Center</h3>

        {this.state.rows && this.state.rows.length > 0
          ? (<table className="table table-hover table-bordered message-table">
            <thead className="thead-inverse">
              <tr className="d-flex">
                <th className="col-2">Name</th>
                <th className="col-8 last-message">Last Message</th>
                <th className="col-2">Time</th>
              </tr>
            </thead>
            <tbody>
              {this.state.rows}
            </tbody>
          </table>)
          : (<div className="no-messages">No messages yet</div>)
        }

      </div>
    )
  }
}

export default withRouter(MessageCenter)
