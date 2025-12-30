// App.tsx
import React, { useEffect, useState } from "react"; 
import axios from 'axios';
import { FaTrophy, FaGamepad, FaCalendarAlt, FaStar } from 'react-icons/fa';

// Tipos
interface GameData {
  id: number;
  name: string;
  released: string;
  rating: number;
  metacritic?: number;
  genres: { name: string }[];
  platforms: { platform: { name: string } }[];
  background_image: string;
}

interface GotyWinner {
  year: number;
  title: string;
  slug?: string; // para buscar en RAWG
}

// Dataset estático de ganadores GOTY (2014–2024)
const GOTY_WINNERS: GotyWinner[] = [
  { year: 2024, title: "Astro Bot" },
  { year: 2023, title: "Baldur's Gate 3" },
  { year: 2022, title: "Elden Ring" },
  { year: 2021, title: "It Takes Two" },
  { year: 2020, title: "The Last of Us Part II" },
  { year: 2019, title: "Sekiro: Shadows Die Twice" },
  { year: 2018, title: "God of War" },
  { year: 2017, title: "The Legend of Zelda: Breath of the Wild" },
  { year: 2016, title: "Overwatch" },
  { year: 2015, title: "The Witcher 3: Wild Hunt" },
  { year: 2014, title: "Dragon Age: Inquisition" },
];

const App: React.FC = () => {
  const [games, setGames] = useState<GameData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // RAWG API key (obtén una gratis en https://rawg.io/apidocs)
  const RAWG_API_KEY = '6dd7491c82d64116b708a5ba54bddc68  '; // Reemplaza esto

  useEffect(() => {
    const fetchGameDetails = async () => {
      const gameDetails: GameData[] = [];
      setError(null);

      for (const winner of GOTY_WINNERS) {
        try {
          const response = await axios.get(
            `https://api.rawg.io/api/games`,
            {
              params: {
                search: winner.title,
                key: RAWG_API_KEY,
                page_size: 1,
              },
            }
          );

          if (response.data.results && response.data.results.length > 0) {
            const game = response.data.results[0];
            gameDetails.push({
              id: game.id,
              name: game.name,
              released: game.released,
              rating: game.rating,
              metacritic: game.metacritic,
              genres: game.genres || [],
              platforms: game.platforms || [],
              background_image: game.background_image,
            });
          } else {
            // Fallback si no se encuentra el juego
            gameDetails.push({
              id: 0,
              name: winner.title,
              released: `${winner.year}-12-01`,
              rating: 0,
              metacritic: null,
              genres: [],
              platforms: [],
              background_image: '',
            });
          }
        } catch (err) {
          console.error(`Error fetching ${winner.title}:`, err);
          gameDetails.push({
            id: 0,
            name: winner.title,
            released: `${winner.year}-12-01`,
            rating: 0,
            metacritic: null,
            genres: [],
            platforms: [],
            background_image: '',
          });
        }
      }

      // Ordenar por año descendente (2024 primero)
      const sortedGames = gameDetails.sort((a, b) => {
        const yearA = GOTY_WINNERS.find(w => w.title === a.name)?.year || 0;
        const yearB = GOTY_WINNERS.find(w => w.title === b.name)?.year || 0;
        return yearB - yearA;
      });

      setGames(sortedGames);
      setLoading(false);
    };

    if (RAWG_API_KEY === 'TU_API_KEY_AQUÍ') {
      alert('⚠️ No olvides reemplazar TU_API_KEY_AQUÍ con tu clave de RAWG');
    }

    fetchGameDetails();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-4">Cargando ganadores del Game of the Year...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-green-400 flex items-center justify-center gap-3">
          <FaTrophy /> Game of the Year Dashboard
        </h1>
        <p className="text-gray-400 mt-2">
          Ganadores del premio principal de The Game Awards (2014–2024)
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game, index) => {
          const year = GOTY_WINNERS.find(w => w.title === game.name)?.year || 'N/A';
          return (
            <div
              key={index}
              className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              {game.background_image && (
                <img
                  src={game.background_image}
                  alt={game.name}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-5">
                <div className="flex justify-between items-start">
                  <h2 className="text-xl font-bold text-green-400">{game.name}</h2>
                  <span className="bg-yellow-600 text-xs font-bold px-2 py-1 rounded">
                    {year}
                  </span>
                </div>

                <div className="mt-3 space-y-2 text-sm text-gray-300">
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt />
                    <span>Lanzamiento: {game.released ? game.released.split('T')[0] : 'N/A'}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <FaStar className="text-yellow-400" />
                    <span>RAWG Rating: {game.rating ? game.rating.toFixed(1) : 'N/A'}</span>
                  </div>

                  {game.metacritic && (
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-green-300">MC: {game.metacritic}</span>
                    </div>
                  )}

                  <div>
                    <FaGamepad className="inline mr-1 text-green-500" />
                    Géneros: {game.genres.map(g => g.name).join(', ') || 'N/A'}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <footer className="mt-12 text-center text-gray-500 text-sm">
        Datos proporcionados por <a href="https://rawg.io" className="text-green-400 hover:underline">RAWG API</a> • 
        Ganadores verificados de The Game Awards
      </footer>
    </div>
  );
};

export default App;