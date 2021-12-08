import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const GQL_LIST_COUNTRIES = gql`
  {
    countries {
      name
      code
      capital
      emoji
      currency
    }
  }
`;

const COUNTRIES_URI = 'https://countries.trevorblades.com'

const countriesClient = new ApolloClient({
  cache: new InMemoryCache(),
  uri: COUNTRIES_URI
});

export { GQL_LIST_COUNTRIES, countriesClient }
