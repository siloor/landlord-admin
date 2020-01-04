'use strict'

require('dotenv').config()

const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const { typeDefs, resolvers } = require('./data/schema')
const expressJwt = require('express-jwt')

const path = '/api'
const PORT = 3000
const corsAllowed = process.env.NODE_ENV !== 'production'

const app = express()

app.use(path, expressJwt({
  secret: process.env.JWT_SECRET,
  credentialsRequired: false
}))

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({
    user: req.user
  }),
  introspection: true
})

server.applyMiddleware({ app, path, cors: corsAllowed })

app.listen(PORT, () => {
  console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`)
})
