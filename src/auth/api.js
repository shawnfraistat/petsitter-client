import apiUrl from '../apiConfig.js'


export const editUserProfile = (user, formData) => {
  return fetch(apiUrl + '/edit-profile', {
    method: 'PATCH',
    body: formData,
    headers: {
      'Authorization':`Token token=${user.token}`
    }
  })
}

export const handleErrors = res => {
  if (res.ok) {
    return res
  } else  {
    throw new Error('Received status in 400 or 500 range.')
  }
}


export const signUp = (formData) => {
  return fetch(apiUrl + '/sign-up', {
    method: 'POST',
    body: formData
  })
}


export const signIn = credentials => {
  return fetch(apiUrl + '/sign-in', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      credentials: {
        email: credentials.email,
        password: credentials.password,
      }
    })
  })
}

export const signOut = user => {
  return fetch(apiUrl + '/sign-out', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization':`Token token=${user.token}`
    }
  })
}

export const createClientAccount = data => {
  return fetch(apiUrl + '/clients', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization':`Token token=${data.token}`
    },
    body: JSON.stringify({
      client: {
        about: data.about
      }
    })
  })
}

export const updateClientAccount = data => {
  return fetch(apiUrl + '/clients/' + data.client.id, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization':`Token token=${data.token}`
    },
    body: JSON.stringify({
      client: {
        about: data.about
      }
    })
  })
}

export const createSitterAccount = data => {
  return fetch(apiUrl + '/sitters', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization':`Token token=${data.token}`
    },
    body: JSON.stringify({
      sitter: {
        name: data.name,
        about: data.about,
        price: data.price,
        service_range: data.service_range,
        animal_types: data.animal_types
      }
    })
  })
}

export const updateSitterAccount = data => {
  return fetch(apiUrl + '/sitters/' + data.sitter.id, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization':`Token token=${data.token}`
    },
    body: JSON.stringify({
      sitter: {
        name: data.name,
        about: data.about,
        price: data.price,
        service_range: data.service_range,
        animal_types: data.animal_types
      }
    })
  })
}


export const getSitters = (user) => {
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

export const getExchanges = user => {
  return fetch(apiUrl + '/exchanges', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization':`Token token=${user.token}`
    }
  })
}
