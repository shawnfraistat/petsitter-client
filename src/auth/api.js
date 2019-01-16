const apiUrl = 'http://localhost:4741'

export const handleErrors = res => {
  if (res.ok) {
    return res
  } else  {
    throw new Error('Received status in 400 or 500 range.')
  }
}

export const editUserProfile = (user, formData) => {
  return fetch(apiUrl + '/edit-profile', {
    method: 'PATCH',
    body: formData,
    headers: {
      'Authorization':`Token token=${user.token}`
    }
  })
}

export const signUp = (formData) => {
  console.log('inside signUp, formData are', formData)
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
//
// export const changePassword = (passwords, user) => {
//   return fetch(apiUrl + '/change-password', {
//     method: 'PATCH',
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization':`Token token=${user.token}`
//     },
//     body: JSON.stringify({
//       passwords: {
//         old: passwords.oldPassword,
//         new: passwords.newPassword
//       }
//     })
//   })
// }

export const createClientAccount = data => {
  console.log('made it inside createClientAcc')
  console.log('data is', data)
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
  console.log('made it inside updateClientAcc')
  console.log('data is', data)
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
  console.log('made it inside updateSitterAcc')
  console.log('data is', data)
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
