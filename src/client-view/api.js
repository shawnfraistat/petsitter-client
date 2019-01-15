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

export const getZipDistance = (zip1, zip2) => {
  return fetch(`https://www.zipcodeapi.com/rest/Q21t36AEGKgknJa5LqGxsinWu2lONlmfvGnDuu7xrdjKCGUbnRX56osogDNHO1Ph/distance.json/${zip1}/${zip2}/mile`, {
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
