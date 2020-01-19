import decodeJwt from 'jwt-decode'
import getGraphqlClient from './graphqlClient'

export const getUserData = () => {
  const token = window.localStorage.getItem('token')

  if (!token) {
    return null
  }

  return decodeJwt(token)
}

export const signup = params => {
  const { username, email, password, role } = params

  const graphQLClient = getGraphqlClient()

  const query = `mutation ($username: String!, $email: String!, $password: String!, $role: String!) {
      signup (username: $username, email: $email, password: $password, role: $role)
    }`

  const variables = {
    username,
    email,
    password,
    role
  }

  return graphQLClient.request(query, variables).then(data => {
    const token = data.signup

    window.localStorage.setItem('token', token)
  })
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

    if (window.location.hash === '#/signup') {
      return Promise.resolve('guest')
    }

    return userData && userData.role ? Promise.resolve(userData.role) : Promise.reject(new Error())
  }
}
