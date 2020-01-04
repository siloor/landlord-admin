import buildGraphqlProvider, { buildQuery } from 'ra-data-graphql-simple'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import config from './config'

const authLink = setContext((_, { headers }) => {
  const token = window.localStorage.getItem('token')

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

export const apiIntrospection = {
  introspection: null
}

const myBuildQuery = introspection => (fetchType, resource, params) => {
  apiIntrospection.introspection = introspection

  return buildQuery(introspection)(fetchType, resource, params)
}

export default () =>
  buildGraphqlProvider({
    buildQuery: myBuildQuery,
    clientOptions: {
      link: authLink.concat(createHttpLink({
        uri: config.apiUrl
      }))
    }
  })
