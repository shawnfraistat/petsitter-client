import React, { Component } from 'react'

import { createMessage, getCurrentExchange, markMessageAsRead  } from './api'
import messages from '../auth/messages.js'
import './MessageCenter.scss'

// Message defines a simplecomponent used by ExchangeView below
const Message = props => {
  let thisClass

  // checks to see if the message is from current user or to current user;
  // sets the message's style (color and positioning) accordingly
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

// ExchangeView is used to display all the messages exchanged between the
// current user and some other user
class ExchangeView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newMessageText: '',
      user: props.getUser()
    }
    this.flash = props.flash

    // get info about this exchange from the API when component loads
    this.getCurrentExchange()
      .then(this.determineConversationPartner)
  }

  componentDidMount() {
    this.scrollToBottom()
  }

  componentDidUpdate() {
    this.scrollToBottom()
  }

  // determineConversationPartner() looks at the exchange returned from the API,
  // which has two user ids associated with it--it figures out which one belongs
  // to the current user and which one refers to the person the current user
  // is corresponding with
  determineConversationPartner = () => {
    let conversationPartner
    if (this.state.exchange.client.id === this.state.user.client.id) {
      conversationPartner = this.state.exchange.sitter.user.name
    } else {
      conversationPartner = this.state.exchange.client.user.name
    }
    this.setState({ conversationPartner })
  }

  // getCurrentExchange() loads data for the current exchange from the API
  getCurrentExchange = () => {
    return getCurrentExchange(this.state.user)
      .then(res => res.json())
      .then(res => this.setState({ exchange: res.exchange }))
      // any messages that are loaded should be marked as read
      .then(this.markAsRead)
      .catch(() => this.flash(messages.cannotReachServer, 'flash-error'))
  }

  // handleChange() binds input data to this.state
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  // handleSubmit() fires when a user submits a new message; it creates a new
  // message on the API
  handleSubmit = (event) => {
    event.preventDefault()
    const data = {
      content: this.state.newMessageText,
      user_id : this.state.user.id,
      exchange_id : this.state.exchange.id
    }
    // send message data to API
    createMessage(this.state.user, data)
      // the exchange has been updated on the server, so reload it
      .then(() => this.getCurrentExchange())
      // clear the message input form
      .then(() => this.setState({ newMessageText: '' }))
      .catch(() => this.flash(messages.cannotReachServer, 'flash-error'))
  }

  // markAsRead() goes through all of the messages associated with the current
  // exchange and marks them as read
  markAsRead = () => {
    const messagesNowRead = this.state.exchange.messages.filter(message => !message.read && message.user.id !== this.state.user.id)
    messagesNowRead.forEach(message => {
      markMessageAsRead(this.state.user, message.id)
        .catch(() => this.flash(messages.cannotReachServer, 'flash-error'))
    })
  }

  // scrollToBottom() makes sure the message display scrolls by default to the
  // bottom of the exchange history (so the users are looking at the most recent
  // messages by default)
  scrollToBottom = () => {
    if (this.messagesEnd) this.messagesEnd.scrollIntoView({ behavior: "auto" });
  }

  render() {
    let messageHistory

    // check whether these two users have exchanges any messages yet; if so,
    // display them; if not, display "No message history"
    if (this.state.exchange) {
      if (!this.state.exchange.messages) {
        messageHistory = (<h1>No message history</h1>)
      } else {
        messageHistory = (<div className="message-history-div">{this.state.exchange.messages.map((message, index) => <Message key={index} user={this.state.user} message={message}/>)}<div ref={(el) => { this.messagesEnd = el }}></div></div>)
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
                   placeholder="Send a message"
                   required
             />
           <button type="submit">Send Message</button>
          </form>
        </div>
    )
  }

}

export default ExchangeView
