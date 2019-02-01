import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import './MessageCenter.scss'

import { getExchanges } from './api.js'

class MessageCenter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: props.getUser()
    }
    this.refresh()
    this.interval = setInterval(this.refresh, 5000)
  }

  handleClick = (event) => {
    const { getUser, history, setUser } = this.props

    const user = getUser()

    user.currentExchange = event.currentTarget.getAttribute('exchangeid')
    setUser(user)
    history.push('/exchange')
  }

  refresh = () => {
    getExchanges(this.state.user)
      .then(res => res.json())
      .then(res => {
        res.exchanges = res.exchanges.filter(exchange => (this.state.user.client && exchange.client.id === this.state.user.client.id)
           || (this.state.user.sitter && exchange.sitter.id === this.state.user.sitter.id))
        return res
      })
      .then(res => {
        this.setState({ currentUserExchanges: res.exchanges })
        console.log(this.state.currentUserExchanges)
      })
      .then(() => this.mapRows())
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  mapRows = () => {
    const rows = this.state.currentUserExchanges.map((exchange, index) => {
      const lastMessage = exchange.messages[exchange.messages.length - 1]
      if (lastMessage) {
        const colorClass = lastMessage.read ? 'table-secondary d-flex' : 'table-light d-flex'
        let datetime = new Date(lastMessage.created_at)
        console.log(datetime.toDateString())
        console.log(new Date().toDateString())
        datetime.toDateString() === new Date().toDateString()
          ? datetime = datetime.toLocaleTimeString('en-US')
          : datetime = `${new Intl.DateTimeFormat('en-US', { month: 'long' }).format(datetime)} ${datetime.getDate()}, ${datetime.getFullYear()}`
        return (
          <tr key={index} className={colorClass} onClick={this.handleClick} exchangeid={exchange.id}>
            <td className="col-2">{this.state.user.client.id === exchange.client.id ? exchange.sitter.user.name : exchange.client.user.name}</td>
            <td className="col-8">{lastMessage.content}</td>
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
      <div>
        <h3>Message Center</h3>

        {this.state.rows
          ? (<table className="table table-hover table-bordered">
            <thead className="thead-dark">
              <tr className="d-flex">
                <th className="col-2">Name</th>
                <th className="col-8">Last Message</th>
                <th className="col-2">Time</th>
              </tr>
            </thead>
            <tbody>
              {this.state.rows}
            </tbody>
          </table>)
          : (<p>No messages yet</p>)

        }

      </div>
    )
  }
}

export default withRouter(MessageCenter)
