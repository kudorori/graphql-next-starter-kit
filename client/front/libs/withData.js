import React from 'react'
import { ApolloClient, createNetworkInterface } from 'react-apollo'
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws';
import fetch from 'isomorphic-fetch'
import { ApolloProvider, getDataFromTree } from 'react-apollo'

let apolloClient = null;

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch
}

const initApollo = (ssl = false , host, initialState) => {

  let wsClient = null;
  let networkInterfaceWithSubscriptions = null;
  const URI = `${ssl ? "https" : "http"}://${host}/graphql`;
  const wsURI = `${ssl ? "wss" : "ws"}://${host}/subscriptions`;
  const networkInterface = createNetworkInterface({
    uri: URI, // Server URL (must be absolute)
    opts: { // Additional fetch() options like `credentials` or `headers`
      credentials: 'same-origin'
    },
    notifyOnNetworkStatusChange: true
  });
  if(process.browser){
    wsClient = new SubscriptionClient(wsURI, {
      reconnect: true
    });
    networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
      networkInterface,
      wsClient
    );
  }

  if(!process.browser) {
    return new ApolloClient({
      initialState,
      ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
      networkInterface: process.browser ? networkInterfaceWithSubscriptions : networkInterface
    })
  } else if(apolloClient == null) {
    apolloClient = new ApolloClient({
      initialState,
      ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
      networkInterface: process.browser ? networkInterfaceWithSubscriptions : networkInterface
    })
  }

  return apolloClient;
}


export default ComposedComponent => {
  return class WithData extends React.Component {
    static async getInitialProps (ctx) {
      let serverState = {};
      let errors = []
      const host = process.browser ? location.host : ctx.req.headers.host;
      const ssl = process.browser ? /https/.test(location.protocol) : ctx.req.connection.encrypted;
      const apollo = initApollo(ssl, host, serverState)
      let composedInitialProps = {}

      if (ComposedComponent.getInitialProps) {
        composedInitialProps = await ComposedComponent.getInitialProps(ctx)
      }

      if (!process.browser) {
        const url = {query: ctx.query, pathname: ctx.pathname}

        // Run all graphql queries
        const app = (
          <ApolloProvider client={apollo}>
            <ComposedComponent url={url} {...composedInitialProps} />
          </ApolloProvider>
        )

        // Extract query data from the Apollo's store
        try {
          await getDataFromTree(app)
          const state = apollo.getInitialState();
          // console.log(state, "STETA");

          serverState = {
            apollo: { // Make sure to only include Apollo's data state
              data: state.data
            }
          }
        } catch(err){
          errors = err.graphQLErrors;
        }
      }

      return {
        ...composedInitialProps,
        ssl,
        host,
        serverState,
        errors
      }
    }

    constructor (props) {
      super(props);
      const { ssl, host, serverState } = props;
      this.apollo = initApollo(ssl, host, serverState);
    }
    render () {
      return (
        <ApolloProvider client={this.apollo}>
          <ComposedComponent {...this.props} />
        </ApolloProvider>
      )
    }
  }
}

export { apolloClient }
