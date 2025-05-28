"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["countries"],
    queryFn: () =>
      fetch("https://restcountries.com/v3.1/all").then((res) => res.json()),
  });

  const [region, setRegion] = useState("All");
  const [sortKey, setSortKey] = useState<"name" | "population">("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [search, setSearch] = useState("");
  const [maxCountries, setMaxCountries] = useState(12);

  if (error)
    return (
      <div className="p-6 text-center text-red-500">
        Erreur lors du chargement des données
      </div>
    );

  let countries = isLoading
    ? []
    : data.map((country: any) => ({
        name: country.translations?.fra?.common || country.name.common,
        capital: country.capital?.[0] || "N/A",
        population: country.population,
        region: country.region,
        flag: country.flags.svg,
      }));

  if (region !== "All") {
    countries = countries.filter((c: any) => c.region === region);
  }

  if (search.trim() !== "") {
    countries = countries.filter((c: any) =>
      c.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  countries.sort((a: any, b: any) => {
    const valueA = sortKey === "name" ? a.name : a.population;
    const valueB = sortKey === "name" ? b.name : b.population;
    return sortOrder === "asc"
      ? valueA > valueB
        ? 1
        : -1
      : valueA < valueB
      ? 1
      : -1;
  });

  return (
    <main className="bg-slate-800 min-h-screen text-white">
      <div className="text-center py-6">
        <h1 className="text-3xl font-bold mb-4">World Explorer</h1>
        <input
          type="text"
          placeholder="Rechercher un pays..."
          className="p-2 rounded text-black"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="mt-4 flex justify-center flex-wrap gap-4">
          <select
            className="text-black p-2 rounded"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          >
            <option value="All">Toutes les régions</option>
            <option value="Africa">Afrique</option>
            <option value="Asia">Asie</option>
            <option value="Europe">Europe</option>
            <option value="Americas">Amériques</option>
            <option value="Oceania">Océanie</option>
          </select>

          <button
            onClick={() => {
              setSortKey("name");
              setSortOrder(sortOrder === "asc" ? "desc" : "asc");
            }}
            className="bg-blue-500 px-4 py-2 rounded"
          >
            Nom {sortKey === "name" && (sortOrder === "asc" ? "A-Z" : "Z-A")}
          </button>

          <button
            onClick={() => {
              setSortKey("population");
              setSortOrder(sortOrder === "asc" ? "desc" : "asc");
            }}
            className="bg-blue-500 px-4 py-2 rounded"
          >
            Population{" "}
            {sortKey === "population" && (sortOrder === "asc" ? "↑" : "↓")}
          </button>
        </div>

        <div className="mt-4">
          <label htmlFor="slider" className="mr-2">
            Nombre de pays à afficher:
          </label>
          <input
            id="slider"
            type="range"
            min="1"
            max="50"
            value={maxCountries}
            onChange={(e) => setMaxCountries(Number(e.target.value))}
          />
          <span className="ml-2">{maxCountries}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-6">
        {isLoading ? (
          <div className="flex justify-center col-span-full">
            <div role="status">
              <svg
                aria-hidden="true"
                className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          countries &&
          countries
            .slice(0, maxCountries)
            .map((country: any, index: number) => (
              <div
                key={index}
                className="bg-white text-black rounded-xl overflow-hidden shadow p-4"
              >
                <Image
                  src={country.flag}
                  alt={`Drapeau de ${country.name}`}
                  width={300}
                  height={200}
                  className="w-full h-40 object-cover"
                />
                <h2 className="text-lg font-bold mt-2">{country.name}</h2>
                <p>
                  <strong>Capitale:</strong> {country.capital}
                </p>
                <p>
                  <strong>Population:</strong>{" "}
                  {country.population.toLocaleString()}
                </p>
                <p>
                  <strong>Région:</strong> {country.region}
                </p>
              </div>
            ))
        )}
      </div>
    </main>
  );
}
