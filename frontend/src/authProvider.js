import decodeJwt from 'jwt-decode'
import getGraphqlClient from './graphqlClient'

export const getUserData = () => {
  const token = window.localStorage.getItem('token')

  return decodeJwt(token)
}

export default {
  login: params => {
    const { email, password } = params

    const graphQLClient = getGraphqlClient()

    const query = `mutation ($email: String!, $password: String!) {
      login (email: $email, password: $password)
    }`

    const variables = {
      email,
      password
    }

    return graphQLClient.request(query, variables).then(data => {
      const token = data.login

      window.localStorage.setItem('token', token)
    })
  },
  logout: params => {
    window.localStorage.removeItem('token')

    return Promise.resolve()
  },
  checkAuth: params => {
    return window.localStorage.getItem('token') ? Promise.resolve() : Promise.reject(new Error())
  },
  checkError: error => Promise.resolve(),
  getPermissions: params => {
    const userData = getUserData()

    return userData.role ? Promise.resolve(userData.role) : Promise.reject(new Error())
  }
}
