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

const myBuildQuery = introspection => (fetchType, resource, params) => {
  apiIntrospection.introspection = introspection

  let propertyId = null

  if (resource.indexOf(propertyRoutePrefix) === 0) {
    resource = resource.substr(propertyRoutePrefix.length)

    const match = window.location.hash.match(new RegExp(`#\\/(.*)\\/${resource}`))

    if (match) {
      propertyId = match[1]
    }
  }

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
