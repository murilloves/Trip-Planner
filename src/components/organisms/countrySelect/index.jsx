import React, {useState, useEffect} from 'react';
import { useQuery } from '@apollo/client';

import { countryStore } from '../../../store/countries';
import { GQL_LIST_COUNTRIES, countriesClient } from '../../../services/graphql';
import { fetchCurrencies } from '../../../services/restapi';

import { SelectBox } from '../../atoms';
import {
  MAX_FAVORITE_COUNTRIES,
  CountryFactory,
  getCountry,
  composeCountryString,
  composeRateString
} from './helpers';

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


const CountrySelect = () => {
  const {data, loading, error} = useQuery(GQL_LIST_COUNTRIES, {client: countriesClient});
  const [rates, setRates] = useState({})

  const mainCountry = countryStore(state => state.mainCountry)
  const storeMainCountry = countryStore(state => state.setMainCountry)

  const allCountries = countryStore(state => state.allCountries)
  const storeAllCountries = countryStore(state => state.setAllCountries)

  const favoriteCountries = countryStore(state => state.favoriteCountries)
  const storeFavoriteCountries = countryStore(state => state.setFavoriteCountries)

  useEffect(() => {
    if (data?.countries) {
      storeAllCountries(data.countries)
    }
  }, [data, storeAllCountries])

  if (loading || error) {
    return <p>{error ? error.message : 'Loading...'}</p>;
  }

  const onChangeMainCountry = async (value) => {
    const country = getCountry(value, allCountries)
    if (country?.currency) {
      const updatedMainCountry = CountryFactory(country)
      storeMainCountry(CountryFactory(updatedMainCountry))

      const rates = await fetchCurrencies(updatedMainCountry, favoriteCountries)
      setRates(rates)
    }
  }

  const onChangeFavoriteCountry = async (value, index) => {
    let updatedFavoriteCountries = favoriteCountries
    const country = getCountry(value, allCountries)

    if (country?.currency) {
      updatedFavoriteCountries[index] = CountryFactory(country)
      storeFavoriteCountries(updatedFavoriteCountries)

      const rates = await fetchCurrencies(mainCountry, updatedFavoriteCountries)
      setRates(rates)
    }
  }

  const onAddFavoriteCountry = () => {
    if (favoriteCountries.length < MAX_FAVORITE_COUNTRIES) {
      const newCountry = CountryFactory({})
      const updatedFavoriteCountries = [...favoriteCountries, newCountry]
      storeFavoriteCountries(updatedFavoriteCountries)
    }
  }

  const onRemoveFavoriteCountry = index => {
    const updatedFavoriteCountries = favoriteCountries.filter((c, loopIndex) => loopIndex !== index)
    storeFavoriteCountries(updatedFavoriteCountries)
  }

  return (
    <>
      <Box>
        <Table size='sm'>
          <Thead>
            <Tr>
              <Th p={['1rem', '1rem 2rem']}>Country</Th>
              <Th display={['none', 'table-cell']} p='1rem'>Capital</Th>
              <Th p='1rem'>Amount</Th>
              <Th display={['none', 'table-cell']} p='1rem'></Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr bg='navy' color='white'>
              <Td p={['0.5rem 0', '0.5rem 1rem']} borderRadius='0.5rem 0 0 0.5rem'>
                <SelectBox
                  options={allCountries}
                  onChange={onChangeMainCountry}
                  value={composeCountryString(mainCountry)}
                  placeholder='Select your main country'
                />
              </Td>
              <Td display={['none', 'table-cell']}> {mainCountry.capital} </Td>
              <Td> 1 {mainCountry?.currency?.split(',')[0]} </Td>
              <Td borderRadius='0 0.5rem 0.5rem 0'></Td>
            </Tr>
            { favoriteCountries.map((favoriteCountry, index) => (
              <Tr key={favoriteCountry.id}>
                <Td p={[0, '0 1rem']}>
                  <SelectBox
                    onChange={onChangeFavoriteCountry}
                    options={allCountries}
                    selectIndex={index}
                    value={composeCountryString(favoriteCountry)}
                    placeholder={`Favorite Country #${index + 1}`}
                  />
                </Td>
                <Td display={['none', 'table-cell']}> { favoriteCountry?.capital } </Td>
                <Td>
                  { composeRateString(mainCountry, favoriteCountry, rates) }
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
                { mainCountry.currency && (
                  <Button
                    colorScheme='white'
                    onClick={onAddFavoriteCountry}
                    disabled={favoriteCountries.length >= MAX_FAVORITE_COUNTRIES}>
                    <Flex bg='dodgerblue' w='1.75rem' h='1.75rem' align='center' justify='center' borderRadius='full'>&#8853;</Flex>
                    <Text color='dodgerblue' ml='0.5rem'>Add Favorite Country</Text>
                  </Button>
                )}
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </Box>
    </>
  );
}

export { CountrySelect }
