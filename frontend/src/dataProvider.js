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

export const propertyRoutePrefix = ':propertyId(\\d+)/'

export const getPropertyId = () => {
  const match = window.location.hash.match(/^#\/(\d+)\//)

  return match ? match[1] : null
}

const myBuildQuery = introspection => (fetchType, resource, params) => {
  apiIntrospection.introspection = introspection

  const propertyId = getPropertyId()

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
