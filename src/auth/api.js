import apiUrl from '../apiConfig.js'

// createClientAccount() is used to create a new client account on the server
// for the current user
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

// createClientAccount() is used to create a new sitter account on the server
// for the current user
export const createSitterAccount = data => {
  return fetch(apiUrl + '/sitters', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization':`Token token=${data.token}`
    },
    body: JSON.stringify({
      sitter: {
        about: data.about,
        price: data.price,
        service_range: data.service_range,
        animal_types: data.animal_types
      }
    })
  })
}

// editUserProfile() is called when the user selects the "edit profile" option
// from the nav menu and submits the form with updated information--it updates
// the user's info on the server
export const editUserProfile = (user, formData) => {
  return fetch(apiUrl + '/edit-profile', {
    method: 'PATCH',
    body: formData,
    headers: {
      'Authorization':`Token token=${user.token}`
    }
  })
}

// getSitters() is used to get all of the sitter accounts from the server
export const getSitters = (user) => {
  return fetch(apiUrl + '/sitters', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization':`Token token=${user.token}`
    }
  })
}

// getZipDistance() uses a third party API to calculate the distance between two
// zip codes: https://www.zipcodeapi.com/
// its purpose is to calculate the distance between the current user and every
// sitter
export const getZipDistance = (zip1, zip2) => {
  return fetch(`https://www.zipcodeapi.com/rest/js-LwOvCoX9fs3x0a6kimttDH2H21GecGI5eV33pSLfdd9SiLurBZbTuoKv0wFDTAHg/distance.json/${zip1}/${zip2}/mile`, {
    method: 'GET'
  })
}

// handleErrors() is a simple error check function used by some of the auth
// components
export const handleErrors = res => {
  if (res.ok) {
    return res
  } else  {
    throw new Error('Received status in 400 or 500 range.')
  }
}

// signIn() is called when an existing user attempts to sign in
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

// signOut() is called when a logged-in user signs out; it deletes their token
// on the server
export const signOut = user => {
  return fetch(apiUrl + '/sign-out', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization':`Token token=${user.token}`
    }
  })
}

// signUp() is used to create a new user account on the API
export const signUp = (formData) => {
  return fetch(apiUrl + '/sign-up', {
    method: 'POST',
    body: formData // submits formData so the user can attach a picture file
  })
}

// updateClientAccount() updates the current user's client account info on the
// server
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

// updateClientAccount() updates the current user's sitter  account info on the
// server
export const updateSitterAccount = data => {
  return fetch(apiUrl + '/sitters/' + data.sitter.id, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization':`Token token=${data.token}`
    },
    body: JSON.stringify({
      sitter: {
        about: data.about,
        price: data.price,
        service_range: data.service_range,
        animal_types: data.animal_types
      }
    })
  })
}
