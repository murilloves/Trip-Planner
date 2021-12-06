import create from "zustand";

const useCountryStore = create(set => ({
  mainCountry: {},
  setMainCountry: country => set(() => ({ mainCountry: country })),

  favoriteCountries: [],
  setFavoriteCountries: countries => set(() => ({ favoriteCountries: countries })),

  allCountries: [],
  setAllCountries: countries => set(() => ({ allCountries: countries })),
}));

export default useCountryStore;
