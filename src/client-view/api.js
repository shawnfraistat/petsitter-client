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
