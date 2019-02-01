import React, { Component } from 'react'

import './MessageCenter.scss'
import messages from '../auth/messages.js'

import { createMessage, getCurrentExchange  } from './api'

const Message = props => {
  console.log('inside Message, props is', props)

  let thisClass
  if (props.message.user_id === props.user.id) {
    thisClass = 'user-message'
  } else {
    thisClass = 'correspondent-message'
  }

  return (
    <div className={thisClass}>
      {props.message.content}
    </div>
  )
}

class ExchangeView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newMessageText: '',
      user: props.getUser()
    }
    this.flash = props.flash

    this.getCurrentExchange()
      .then(this.determineConversationPartner)
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const data = {
      content: this.state.newMessageText,
      user_id : this.state.user.id,
      exchange_id : this.state.exchange.id
    }
    createMessage(this.state.user, data)
      .then(() => this.getCurrentExchange())
      .catch(() => this.flash(messages.cannotReachServer, 'flash-error'))
  }

  getCurrentExchange = () => {
    return getCurrentExchange(this.state.user)
      .then(res => res.json())
      .then(res => this.setState({ exchange: res.exchange }))
      .catch(() => this.flash(messages.cannotReachServer, 'flash-error'))
  }

  determineConversationPartner = () => {
    console.log('inside determineConversationPartner, this.state.exchange is', this.state.exchange)
    let conversationPartner
    if (this.state.exchange.client.id === this.state.user.client.id) {
      conversationPartner = this.state.exchange.sitter.user.name
    } else {
      conversationPartner = this.state.exchange.client.user.name
    }
    this.setState({ conversationPartner })
  }


  render() {

    let messageHistory

    if (this.state.exchange) {
      if (!this.state.exchange.messages) {
        console.log('I should be setting messageHistory to <h1>No message history </h1>')
        messageHistory = (<h1>No message history</h1>)
      } else {
        console.log('in the else branch')
        console.log(this.state.exchange.messages)
        messageHistory = (<div className="message-history-div">{this.state.exchange.messages.map((message, index) => <Message key={index} user={this.state.user} message={message}/>)}</div>)
      }
    }

    return (
        <div className="exchange-view-div">
          {this.state.conversationPartner && (<h3>Your Conversation with {this.state.conversationPartner}</h3>)}
          {messageHistory}
          <form className="new-message-form" onSubmit={this.handleSubmit}>
            <textarea type="text"
                   name="newMessageText"
                   value={this.state.newMessageText}
                   onChange={this.handleChange}
                   required
             />
           <button type="submit">Send Message</button>
          </form>
        </div>
    )
  }

}

export default ExchangeView
