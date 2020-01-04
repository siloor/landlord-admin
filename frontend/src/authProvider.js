import decodeJwt from 'jwt-decode'
import getGraphqlClient from './graphqlClient'

export default {
  login: params => {
    const { username, password } = params

    const graphQLClient = getGraphqlClient()

    const query = `mutation login($email: String!, $password: String!) {
      login (email: $email, password: $password)
    }`

    const variables = {
      email: username,
      password
    }

    return graphQLClient.request(query, variables).then(data => {
      const token = data.login
      const decodedToken = decodeJwt(token)

      window.localStorage.setItem('token', token)
      window.localStorage.setItem('role', decodedToken.role)
    })
  },
  logout: params => {
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('role')

    return Promise.resolve()
  },
  checkAuth: params => {
    return window.localStorage.getItem('token') ? Promise.resolve() : Promise.reject(new Error())
  },
  checkError: error => Promise.resolve(),
  getPermissions: params => {
    const role = window.localStorage.getItem('role')

    return role ? Promise.resolve(role) : Promise.reject(new Error())
  }
}
