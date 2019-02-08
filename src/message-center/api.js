import apiUrl from '../apiConfig.js'

// createMessage() creates a new message on the server
export const createMessage = (user, data) => {
  return fetch(apiUrl + '/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization':`Token token=${user.token}`
    },
    body: JSON.stringify({
      message: {
        content: data.content,
        exchange_id: data.exchange_id,
        user_id: data.user_id,
        read: false
      }
    })
  })
}

// getCurrentExchange() fetches the current exchange details from the server
export const getCurrentExchange = user => {
  return fetch(apiUrl + '/exchanges/' + user.currentExchange, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization':`Token token=${user.token}`
    }
  })
}

// getExchanges() returns all of the exchanges from the server
export const getExchanges = user => {
  return fetch(apiUrl + '/exchanges', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization':`Token token=${user.token}`
    }
  })
}

// markMessageAsRead() updates the current messages to indicate the user has
// read them
export const markMessageAsRead = (user, messageId) => {
  return fetch(apiUrl + '/messages/' + messageId, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization':`Token token=${user.token}`
    },
    body: JSON.stringify({
      message: {
        read: true
      }
    })
  })
}
