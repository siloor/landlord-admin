import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_GET_PERMISSIONS, AUTH_CHECK } from 'react-admin'
import decodeJwt from 'jwt-decode'
import getGraphqlClient from './graphqlClient'

export default (type, params) => {
  if (type === AUTH_LOGIN) {
    const { username, password } = params

    const graphQLClient = getGraphqlClient()

    const query = `mutation {
      login (email: "${username}", password: "${password}")
    }`

    return graphQLClient.request(query).then(data => {
      const token = data.login
      const decodedToken = decodeJwt(token)

      window.localStorage.setItem('token', token)
      window.localStorage.setItem('role', decodedToken.role)
    })
  }
  if (type === AUTH_LOGOUT) {
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('role')

    return Promise.resolve()
  }
  if (type === AUTH_ERROR) {
    return Promise.resolve()
  }
  if (type === AUTH_CHECK) {
    return window.localStorage.getItem('token') ? Promise.resolve() : Promise.reject(new Error())
  }
  if (type === AUTH_GET_PERMISSIONS) {
    const role = window.localStorage.getItem('role')

    return role ? Promise.resolve(role) : Promise.reject(new Error())
  }

  return Promise.reject(new Error('Unknown method'))
}
