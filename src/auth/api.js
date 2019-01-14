const apiUrl = 'http://localhost:4741'

export const handleErrors = res => {
  if (res.ok) {
    return res
  } else  {
    throw new Error('Received status in 400 or 500 range.')
  }
}

export const signUp = credentials => {
  return fetch(apiUrl + '/sign-up', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      credentials: {
        email: credentials.email,
        password: credentials.password,
        password_confirmation: credentials.passwordConfirmation,
        name: credentials.name,
        zip_code: credentials.zip_code
      }
    })
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

export const changePassword = (passwords, user) => {
  return fetch(apiUrl + '/change-password', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization':`Token token=${user.token}`
    },
    body: JSON.stringify({
      passwords: {
        old: passwords.oldPassword,
        new: passwords.newPassword
      }
    })
  })
}

export const createClientAccount = data => {
  // console.log('made it inside createClientAcc')
  // console.log('data is', data)
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

export const createSitterAccount = data => {
  console.log('made it inside createSitterAcc')
  console.log('data is', data)
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

export const editProfile = data => {
  console.log('inside editProfile in api.js, data is', data)
  return fetch(apiUrl + '/edit-profile', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization':`Token token=${data.token}`
    },
    body: JSON.stringify({
      data: {
        email: data.email,
        password: data.password,
        name: data.name,
        about: data.about,
        price: data.price,
        service_range: data.service_range,
        animal_types: data.animal_types
      }
    })
  })
}
