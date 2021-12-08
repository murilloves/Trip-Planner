import create from "zustand";
import { CountryFactory } from "../components/organisms/countrySelect/helpers"; 

const MAIN_COUNTRY = '_main_countries'
const FAVORITE_COUNTRIES = '_favorite_countries'

const countryStore = create(set => ({
  allCountries: [],
  setAllCountries: (countries = {}) => set(() => ({ allCountries: countries })),

  mainCountry: JSON.parse(localStorage.getItem(MAIN_COUNTRY)) || CountryFactory({}),
  setMainCountry: country => set(() => {
    localStorage.setItem(MAIN_COUNTRY, JSON.stringify(country))
    return { mainCountry: country }
  }),

  favoriteCountries: JSON.parse(localStorage.getItem(FAVORITE_COUNTRIES)) || [],
  setFavoriteCountries: countries => set(() => {
    localStorage.setItem(FAVORITE_COUNTRIES, JSON.stringify(countries))
    return { favoriteCountries: countries }
  }),
}));

export { countryStore };
