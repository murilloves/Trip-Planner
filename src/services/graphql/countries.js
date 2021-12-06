import {ApolloClient, InMemoryCache, gql, useQuery} from '@apollo/client';

const LIST_COUNTRIES = gql`
  {
    countries {
      name
      code
    }
  }
`;

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'https://countries.trevorblades.com'
});


