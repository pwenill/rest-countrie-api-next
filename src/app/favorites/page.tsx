"use client";
import Card from "@/components/card";
import useFavorites from "@/components/use-favorites";

export default function Favorites() {
  const { favorites } = useFavorites();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-6">
      {favorites.length == 0 ? (
        <p className="text-center col-span-full">Aucun favoris enregistrer</p>
      ) : (
        favorites.map((fav, index) => {
          return <Card key={index} {...fav} />;
        })
      )}
    </div>
  );
}
