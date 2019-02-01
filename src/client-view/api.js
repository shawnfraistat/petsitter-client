import apiUrl from '../apiConfig.js'

export const createFavorite = (user, sitterID) => {
  return fetch(apiUrl + '/favorites', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization':`Token token=${user.token}`
    },
    body: JSON.stringify({
      favorite: {
        client_id: user.client.id,
        sitter_id: sitterID
      }
    })
  })
}

export const deleteFavorite = (user, favoriteID) => {
  return fetch(apiUrl + '/favorites/' + favoriteID, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization':`Token token=${user.token}`
    }
  })
}

export const createExchange = (user, sitterID) => {
  return fetch(apiUrl + '/exchanges', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization':`Token token=${user.token}`
    },
    body: JSON.stringify({
      exchange: {
        client_id: user.client.id,
        sitter_id: sitterID
      }
    })
  })
}
