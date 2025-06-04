import Image from "next/image";
import useFavorites from "./use-favorites";
import { Star } from "lucide-react";

interface Props {
  name: string;
  flag: string;
  capital: string;
  population: string;
  region: string;
}

export default function Card(country: Props) {
  const favoriteStore = useFavorites();
  const idName = country.name.toLowerCase().trim().replace(" ", "-");

  return (
    <div className="bg-white text-black rounded-xl overflow-hidden shadow">
      <Image
        src={country.flag}
        alt={`Drapeau de ${country.name}`}
        width={300}
        height={200}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold mt-2">{country.name}</h2>
          <button
            onClick={() => {
              if (favoriteStore.favorites.find((x) => x.id == idName)) {
                favoriteStore.removeFavorite(idName);
              } else {
                favoriteStore.addFavorite({
                  id: idName,
                  ...country,
                });
              }
            }}
          >
            <Star
              className={
                favoriteStore.favorites.find((x) => x.id == idName)
                  ? "fill-yellow-300 text-yellow-300"
                  : ""
              }
            />
          </button>
        </div>
        <p>
          <strong>Capitale:</strong> {country.capital}
        </p>
        <p>
          <strong>Population:</strong> {country.population.toLocaleString()}
        </p>
        <p>
          <strong>Région:</strong> {country.region}
        </p>
      </div>
    </div>
  );
}
