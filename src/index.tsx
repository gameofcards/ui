import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { PersistentStorage, PersistedData } from 'apollo-cache-persist/types';
import { persistCache } from 'apollo-cache-persist';

const store = {
  data: {
    test: 'hello world omg',
    theNumber: 42,
    todos: [
      { id: 1, name: 'bob', todo: 'run', __typename: 'todo' },
      { id: 2, name: 'bill', todo: 'sit', __typename: 'todo' },
      { id: 3, name: 'buck', todo: 'walk', __typename: 'todo' },
    ],
  },
};
const cache = new InMemoryCache();

persistCache({
  cache,
  storage: window.localStorage as PersistentStorage<PersistedData<NormalizedCacheObject>>,
});

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache,
  resolvers: {
    Query: {
      derivedString: () => {
        return 'derived';
      },
      derivedObj: () => ({
        a: 'a',
        b: 'b',
        c: 'c',
      }),
      derivedArray: () => {
        return [0, 1, 2];
      },
    },
    Mutation: {
      initCache: (_root, _args, { cache }) => {
        cache.writeData(store);
        console.log('inittin cache');
        return null;
      },
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
