import { create } from "zustand";

interface CountryProps {
  id: string;
  name: string;
  flag: string;
  capital: string;
  population: string;
  region: string;
}

type Store = {
  favorites: CountryProps[];
  addFavorite: (country: CountryProps) => void;
  removeFavorite: (id: string) => void;
};

const useFavorites = create<Store>()((set) => ({
  favorites: [],
  addFavorite: (country: CountryProps) => {
    set((state) => ({
      favorites: state.favorites.some((fav) => fav.id === country.id)
        ? state.favorites
        : [...state.favorites, country],
    }));
  },
  removeFavorite: (id: string) => {
    set((state) => ({
      favorites: state.favorites.filter((country) => country.id !== id),
    }));
  },
}));

export default useFavorites;
