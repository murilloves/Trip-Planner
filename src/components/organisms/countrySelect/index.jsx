import React, {useState, useEffect} from 'react';
import {ApolloClient, InMemoryCache, gql, useQuery} from '@apollo/client';

import useCountryStore from '../../../store/countries'

import { SelectBox } from '../../atoms';

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Button,
  Flex,
  Text
} from '@chakra-ui/react'

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'https://countries.trevorblades.com'
});

const LIST_COUNTRIES = gql`
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

const NewCountry = ({ name= '', code= '', currency= '', emoji= '', capital= '' }) => ({
  id: Math.floor(1000000 * Math.random()) + 1000000,
  name,
  code,
  capital,
  emoji,
  currency
})

const CountrySelect = () => {
  const {data, loading, error} = useQuery(LIST_COUNTRIES, {client});
  const [rates, setRates] = useState({})

  const mainCountry = useCountryStore(state => state.mainCountry)
  const storeMainCountry = useCountryStore(state => state.setMainCountry)

  const allCountries = useCountryStore(state => state.allCountries)
  const storeAllCountries = useCountryStore(state => state.setAllCountries)

  const favoriteCountries = useCountryStore(state => state.favoriteCountries)
  const storeFavoriteCountries = useCountryStore(state => state.setFavoriteCountries)

  useEffect(() => {
    if (data?.countries) {
      storeAllCountries(data.countries)
    }
  }, [data, storeAllCountries])

  if (loading || error) {
    return <p>{error ? error.message : 'Loading...'}</p>;
  }

  const getCurrencies = async (url = '') => {
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })

    return response.json()
  }

  const getCountry = (countryName) => {
    const country = allCountries.find(country => countryName.indexOf(country.emoji) >= 0)
    return country || {}
  }

  const onChangeMainCountry = async (value) => {
    const country = getCountry(value)
    if (country?.currency) {
      const updatedMainCountry = NewCountry(country)
      storeMainCountry(NewCountry(updatedMainCountry))

      favoriteCountries.length < 1
        ? onAddFavoriteCountry()
        : onPerformRequest(updatedMainCountry, favoriteCountries)
    }
  }

  const onChangeFavoriteCountry = (value, index) => {
    let updatedFavoriteCountries = favoriteCountries
    const country = getCountry(value)
    if (country?.currency) {
      updatedFavoriteCountries[index] = NewCountry(country)
      storeFavoriteCountries(updatedFavoriteCountries)

      onPerformRequest(mainCountry, updatedFavoriteCountries)
    }
  }

  const onAddFavoriteCountry = () => {
    if (favoriteCountries.length < 5) {
      const newCountry = NewCountry({})
      const favorites = [...favoriteCountries, newCountry]
      storeFavoriteCountries(favorites)
    }
  }

  const onRemoveFavoriteCountry = index => {
    const favorites = favoriteCountries.filter((country, loopIndex) => loopIndex !== index)
    storeFavoriteCountries(favorites)
  }

  const onPerformRequest = async (mainCountry, favoriteCountries) => {
    const BASE_URL = 'https://api.frankfurter.app/latest'
    const fromCurrency = mainCountry?.currency.split(',')[0]
    const toCurrencies = favoriteCountries
      .map(favorite => favorite.currency)
      .join(',')

    if (fromCurrency && toCurrencies) {
      try {
        const res = await getCurrencies(`${BASE_URL}?from=${fromCurrency}&to=${toCurrencies}`)
        const { rates } = res
        if (rates) {
          setRates(rates)
        }
      } catch (err) {
        console.error(err)
      }
    }
  }

  return (
    <>
      <Box>
        <Table size='sm'>
          <Thead>
            <Tr>
              <Th p='1rem 2rem'>Country</Th>
              <Th p='1rem'>Capital</Th>
              <Th p='1rem'>Amount</Th>
              <Th p='1rem'></Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr bg='navy' color='white'>
              <Td borderRadius='0.5rem 0 0 0.5rem'>
                <SelectBox
                  options={allCountries}
                  onChange={onChangeMainCountry}
                  value={mainCountry.currency && `${mainCountry.emoji}   ${mainCountry.name}`}
                  placeholder='Select your main country'
                />
              </Td>
              <Td> {mainCountry.capital} </Td>
              <Td> 1 {mainCountry?.currency?.split(',')[0]} </Td>
              <Td borderRadius='0 0.5rem 0.5rem 0'></Td>
            </Tr>
            { favoriteCountries.map((country, index) => (
              <Tr key={country.id}>
                <Td>
                  <SelectBox
                    onChange={onChangeFavoriteCountry}
                    options={allCountries}
                    selectIndex={index}
                    value={country.currency && `${country.emoji}   ${country.name}`}
                    placeholder='Select favorite country'
                  />
                </Td>
                <Td> { country?.capital } </Td>
                <Td>
                  { rates[country?.currency?.split(',')[0]] && (
                    `${rates[country?.currency?.split(',')[0]]?.toFixed(2)} ${country.currency.split(',')[0]}`
                  )}
                </Td>
                <Td>
                  <Box onClick={() => onRemoveFavoriteCountry(index)}>
                    <Button color='red' bg='white' p='0' borderRadius='full'>&#8854;</Button>
                  </Box>
                </Td>
              </Tr>
            ))}
            <Tr>
              <Td border='none' p='1rem 0.75rem'>
                <Button colorScheme='white' onClick={onAddFavoriteCountry} disabled={favoriteCountries.length >= 5}>
                  <Flex bg='dodgerblue' w='1.75rem' h='1.75rem' align='center' justify='center' borderRadius='full'>&#8853;</Flex>
                  <Text color='dodgerblue' ml='0.5rem'>Add Favorite Country</Text>
                </Button>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </Box>

    </>
  );
}

export { CountrySelect }
