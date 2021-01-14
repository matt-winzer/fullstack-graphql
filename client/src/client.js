import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { ApolloLink } from 'apollo-link'
import gql from 'graphql-tag'
import { setContext } from 'apollo-link-context'

/**
 * Create a new apollo client and export as default
 */

const http = new HttpLink({ uri: 'http://localhost:4000/' })

// simulate delayed response from API to test optimistic updates
const delay = setContext(
  (request) =>
    new Promise((success, fail) => {
      setTimeout(() => {
        success()
      }, 800)
    }),
)

// middleware to compose link
const link = ApolloLink.from([delay, http])

const cache = new InMemoryCache()

const client = new ApolloClient({
  link,
  cache,
})

export default client
