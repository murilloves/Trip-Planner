import React from 'react';
import { CountrySelect } from './components/organisms/countrySelect';

import { ChakraProvider, Box, Text } from '@chakra-ui/react'

function App() {
  return (
    <ChakraProvider>
      <Box m={[0, '2rem']}>
        <Text textAlign='center' fontSize='3xl' fontWeight='bold' m='1rem'>Trip Planner</Text>
        <Text m='2rem' color='gray' fontSize='sm'> Going to another country? We can help you with currency and more... </Text>
        <CountrySelect />
      </Box>
    </ChakraProvider>
  );
}

export default App;
