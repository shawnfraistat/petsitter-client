const apiUrl = 'http://localhost:4741'

export const index = (user) => {
  return fetch(apiUrl + '/sitters', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization':`Token token=${user.token}`
    }
  })
}

// Third party zipcode api courtest of: https://www.zipcodeapi.com/
export const getZipDistance = (zip1, zip2) => {
  return fetch(`https://www.zipcodeapi.com/rest/js-LwOvCoX9fs3x0a6kimttDH2H21GecGI5eV33pSLfdd9SiLurBZbTuoKv0wFDTAHg/distance.json/${zip1}/${zip2}/mile`, {
    method: 'GET'
  })
}

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

export const getFavorites = user => {
  return fetch(apiUrl + '/favorites', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization':`Token token=${user.token}`
    }
  })
}
