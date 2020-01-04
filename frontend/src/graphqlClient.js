import { GraphQLClient } from 'graphql-request'
import config from './config'

const getGraphqlClient = () => {
  const token = window.localStorage.getItem('token')

  const headers = {}

  if (token) {
    headers.authorization = 'Bearer ' + token
  }

  return new GraphQLClient(config.apiUrl, {
    headers: headers
  })
}

export default getGraphqlClient
