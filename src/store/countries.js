import create from "zustand";
import { CountryFactory } from "../components/organisms/countrySelect/helpers"; 

const countryStore = create(set => ({
  mainCountry: CountryFactory({}),
  setMainCountry: country => set(() => ({ mainCountry: country })),

  favoriteCountries: [],
  setFavoriteCountries: countries => set(() => ({ favoriteCountries: countries })),

  allCountries: [],
  setAllCountries: countries => set(() => ({ allCountries: countries })),
}));

export { countryStore };
