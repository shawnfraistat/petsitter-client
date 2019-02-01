import apiUrl from '../apiConfig.js'

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

export const getCurrentExchange = user => {
  return fetch(apiUrl + '/exchanges/' + user.currentExchange, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization':`Token token=${user.token}`
    }
  })
}

export const getExchanges = user => {
  return fetch(apiUrl + '/exchanges', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization':`Token token=${user.token}`
    }
  })
}
