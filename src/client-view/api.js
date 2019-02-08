import apiUrl from '../apiConfig.js'

// createFavorite() is called when the user is searching for sitters and
// favorites one--it creates a new favorite on the server
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

// createExchange() is called when the user clicks on the "message" button in a
// SitterPreview and they don't already have an exchange going; it creates a new
// one
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

// deleteFavorite() is called when the user is searching for sitters and
// unfavorites one--it deletes the associated favorite on the server
export const deleteFavorite = (user, favoriteID) => {
  return fetch(apiUrl + '/favorites/' + favoriteID, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization':`Token token=${user.token}`
    }
  })
}
