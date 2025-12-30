import { useState, useEffect } from "react";
import axios from "axios";
import { GameWithYear, Stats } from "../types/gameTypes";
import { GOTY_WINNERS, POPULAR_GAMES } from "../utils/constants";

const RAWG_API_KEY = import.meta.env.VITE_RAWG_API_KEY || '6dd7491c82d64116b708a5ba54bddc68';
const BASE_URL = "https://api.rawg.io/api/games";

// Slugs alternativos en caso de que el principal falle
const SLUG_ALTERNATIVES: Record<string, string[]> = {
  "the-last-of-us-part-ii": ["the-last-of-us-2", "the-last-of-us-part-ii-1", "the-last-of-us-2-2020"],
  "sekiro-shadows-die-twice": ["sekiro", "sekiro-shadows-die-twice-1"],
  "god-of-war": ["god-of-war-2018", "god-of-war-2"],
  "the-walking-dead": ["the-walking-dead-season-one", "the-walking-dead-2012"]
};

export const useGames = () => {
  const [games, setGames] = useState<GameWithYear[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [apiStatus, setApiStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // Función para buscar juegos por nombre si el slug falla
  const searchGameByName = async (gameName: string, year: number) => {
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          key: RAWG_API_KEY,
          search: gameName,
          page_size: 5
        }
      });

      if (response.data.results?.length > 0) {
        // Buscar el resultado más relevante
        const bestMatch = response.data.results[0];
        return {
          ...bestMatch,
          year,
          gotyWinner: true,
          rank: 0 // Se actualizará después
        };
      }
    } catch (err) {
      console.warn(`Error searching ${gameName}:`, err);
    }
    return null;
  };

  const fetchGames = async () => {
    setLoading(true);
    setApiStatus('loading');
    setError(null);

    try {
      const allGames: GameWithYear[] = [];
      let rank = 1;

      // 1. Obtener juegos GOTY con manejo mejorado de errores
      for (const winner of GOTY_WINNERS) {
        try {
          let gameData = null;
          let attempts = [winner.slug];
          
          // Intentar slugs alternativos
          if (SLUG_ALTERNATIVES[winner.slug]) {
            attempts = [winner.slug, ...SLUG_ALTERNATIVES[winner.slug]];
          }

          // Intentar cada slug posible
          for (const slugAttempt of attempts) {
            try {
              const response = await axios.get(`${BASE_URL}/${slugAttempt}`, {
                params: { key: RAWG_API_KEY },
                timeout: 5000
              });
              
              if (response.status === 200) {
                gameData = response.data;
                break;
              }
            } catch (slugError) {
              console.log(`Slug ${slugAttempt} falló para ${winner.title}`);
              continue;
            }
          }

          // Si todos los slugs fallan, buscar por nombre
          if (!gameData) {
            console.log(`Buscando ${winner.title} por nombre...`);
            const searchedGame = await searchGameByName(winner.title, winner.year);
            if (searchedGame) {
              gameData = searchedGame;
            }
          }

          if (gameData) {
            allGames.push({
              ...gameData,
              year: winner.year,
              gotyWinner: true,
              rank: rank++
            });
            console.log(`✓ ${winner.title} cargado exitosamente`);
          } else {
            console.warn(`✗ No se pudo cargar ${winner.title}, usando datos demo`);
            // Usar datos de demostración para este juego
            allGames.push({
              ...getDemoGame(winner.title, winner.year, true),
              rank: rank++
            });
          }

          // Pequeña pausa para no sobrecargar la API
          await new Promise(resolve => setTimeout(resolve, 300));
        } catch (err) {
          console.warn(`Error procesando ${winner.title}:`, err);
          // Usar datos de demostración en caso de error
          allGames.push({
            ...getDemoGame(winner.title, winner.year, true),
            rank: rank++
          });
        }
      }

      // 2. Obtener juegos populares
      for (const gameName of POPULAR_GAMES) {
        try {
          const response = await axios.get(BASE_URL, {
            params: {
              key: RAWG_API_KEY,
              search: gameName,
              page_size: 1
            },
            timeout: 5000
          });

          if (response.data.results?.length > 0) {
            const gameData = response.data.results[0];
            const year = gameData.released ? new Date(gameData.released).getFullYear() : 2020;
            
            allGames.push({
              ...gameData,
              year,
              gotyWinner: false,
              rank: rank++
            });
            console.log(`✓ ${gameName} cargado exitosamente`);
          } else {
            console.warn(`✗ No se encontró ${gameName}, usando datos demo`);
            allGames.push({
              ...getDemoGame(gameName, 2020, false),
              rank: rank++
            });
          }

          await new Promise(resolve => setTimeout(resolve, 250));
        } catch (err) {
          console.warn(`Error fetching ${gameName}:`, err);
          allGames.push({
            ...getDemoGame(gameName, 2020, false),
            rank: rank++
          });
        }
      }

      if (allGames.length === 0) {
        throw new Error("No se pudieron cargar datos de juegos");
      }

      setGames(allGames);
      setApiStatus('success');
      console.log(`✅ Total de juegos cargados: ${allGames.length}`);
    } catch (err) {
      console.error("Error fetching games:", err);
      setError("Error al cargar algunos datos. Usando datos combinados.");
      setApiStatus('error');
      setGames(getDemoGames()); // Datos de demostración completos
    } finally {
      setLoading(false);
    }
  };

  // Función para generar datos demo de un juego específico
  const getDemoGame = (name: string, year: number, gotyWinner: boolean): GameWithYear => {
    const demoGamesMap: Record<string, Partial<GameWithYear>> = {
      "The Last of Us Part II": {
        background_image: "https://media.rawg.io/media/games/9f1/9f1891779cb20f44de93cef33b067e50.jpg",
        metacritic: 93,
        rating: 4.6,
        genres: [{ id: 3, name: "Action" }, { id: 4, name: "Adventure" }],
      },
      "Sekiro: Shadows Die Twice": {
        background_image: "https://media.rawg.io/media/games/c25/c25ebb8eb29d2e6b511c3a4b5f55bac2.jpg",
        metacritic: 90,
        rating: 4.5,
        genres: [{ id: 3, name: "Action" }, { id: 5, name: "RPG" }],
      },
      "God of War": {
        background_image: "https://media.rawg.io/media/games/4be/4be6a6ad0364751a96229c56bf69be59.jpg",
        metacritic: 94,
        rating: 4.7,
        genres: [{ id: 3, name: "Action" }, { id: 4, name: "Adventure" }],
      },
      "The Walking Dead": {
        background_image: "https://media.rawg.io/media/games/8d6/8d69eb6c32ed6acfd75f82d532144993.jpg",
        metacritic: 82,
        rating: 4.2,
        genres: [{ id: 4, name: "Adventure" }],
      },
      "It Takes Two": {
        background_image: "https://media.rawg.io/media/games/fd1/fd1af7595a8a5b5c94c42e18d4c1354d.jpg",
        metacritic: 88,
        rating: 4.5,
        genres: [{ id: 4, name: "Adventure" }, { id: 7, name: "Puzzle" }],
      }
    };

    const specificData = demoGamesMap[name] || {};

    return {
      id: Math.floor(Math.random() * 10000),
      name,
      released: `${year}-01-01`,
      rating: specificData.rating || 4.0,
      rating_top: 5,
      ratings_count: Math.floor(Math.random() * 50000) + 10000,
      metacritic: specificData.metacritic || 85,
      playtime: Math.floor(Math.random() * 60) + 20,
      background_image: specificData.background_image || `https://images.unsplash.com/photo-1550745165-9bc0b252726f?fit=crop&w=600&h=400&q=80`,
      genres: specificData.genres || [{ id: 1, name: "Action" }],
      platforms: [
        { platform: { id: 4, name: "PC" } },
        { platform: { id: 187, name: "PlayStation 5" } }
      ],
      tags: [],
      esrb_rating: { id: 3, name: "Mature" },
      added: Math.floor(Math.random() * 100000),
      year,
      gotyWinner,
      rank: 0
    };
  };

  const calculateStats = (gamesList: GameWithYear[]): Stats => {
    if (gamesList.length === 0) {
      return {
        totalGames: 0,
        averageRating: 0,
        averageMetacritic: 0,
        totalPlaytime: 0,
        topGenre: "",
        mostPopularYear: 0,
      };
    }

    const totalGames = gamesList.length;
    const averageRating = gamesList.reduce((sum, game) => sum + game.rating, 0) / totalGames;
    
    const gamesWithMetacritic = gamesList.filter(g => g.metacritic);
    const averageMetacritic = gamesWithMetacritic.length > 0
      ? gamesWithMetacritic.reduce((sum, game) => sum + (game.metacritic || 0), 0) / gamesWithMetacritic.length
      : 0;

    const totalPlaytime = gamesList.reduce((sum, game) => sum + game.playtime, 0);

    // Género más común
    const genreCount: Record<string, number> = {};
    gamesList.forEach(game => {
      game.genres.forEach(genre => {
        genreCount[genre.name] = (genreCount[genre.name] || 0) + 1;
      });
    });
    const topGenre = Object.entries(genreCount).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A";

    // Año más popular
    const yearCount: Record<number, number> = {};
    gamesList.forEach(game => {
      yearCount[game.year] = (yearCount[game.year] || 0) + 1;
    });
    const mostPopularYear = parseInt(Object.entries(yearCount).sort((a, b) => b[1] - a[1])[0]?.[0] || "0");

    return {
      totalGames,
      averageRating,
      averageMetacritic,
      totalPlaytime,
      topGenre,
      mostPopularYear,
    };
  };

  const getYearStats = (gamesList: GameWithYear[]) => {
    const yearData: Record<number, { year: number; count: number; avgRating: number; winners: number }> = {};
    
    gamesList.forEach(game => {
      if (!yearData[game.year]) {
        yearData[game.year] = {
          year: game.year,
          count: 0,
          avgRating: 0,
          winners: 0
        };
      }
      
      yearData[game.year].count++;
      yearData[game.year].avgRating += game.rating;
      if (game.gotyWinner) yearData[game.year].winners++;
    });

    Object.keys(yearData).forEach(year => {
      const yearNum = parseInt(year);
      yearData[yearNum].avgRating = parseFloat((yearData[yearNum].avgRating / yearData[yearNum].count).toFixed(2));
    });

    return Object.values(yearData).sort((a, b) => a.year - b.year);
  };

  const getGenreStats = (gamesList: GameWithYear[]) => {
    const genreCount: Record<string, number> = {};
    
    gamesList.forEach(game => {
      game.genres.forEach(genre => {
        genreCount[genre.name] = (genreCount[genre.name] || 0) + 1;
      });
    });

    return Object.entries(genreCount)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 6);
  };

  useEffect(() => {
    fetchGames();
  }, []);

  return {
    games,
    loading,
    error,
    apiStatus,
    fetchGames,
    calculateStats,
    getYearStats,
    getGenreStats
  };
};

// Datos de demostración completos
const getDemoGames = (): GameWithYear[] => {
  return [
    {
      id: 1,
      name: "Baldur's Gate 3",
      released: "2023-08-03",
      rating: 4.78,
      rating_top: 5,
      ratings_count: 85000,
      metacritic: 96,
      playtime: 105,
      background_image: "https://media.rawg.io/media/games/fd1/fd1af7595a8a5b5c94c42e18d4c1354d.jpg",
      genres: [{ id: 1, name: "RPG" }, { id: 2, name: "Adventure" }],
      platforms: [
        { platform: { id: 4, name: "PC" } },
        { platform: { id: 187, name: "PlayStation 5" } }
      ],
      tags: [],
      added: 123456,
      year: 2023,
      gotyWinner: true,
      rank: 1
    },
    {
      id: 2,
      name: "Elden Ring",
      released: "2022-02-25",
      rating: 4.65,
      rating_top: 5,
      ratings_count: 125000,
      metacritic: 94,
      playtime: 87,
      background_image: "https://media.rawg.io/media/games/5ec/5ecac5cb026ec26a56efcc546364e3a6.jpg",
      genres: [{ id: 1, name: "RPG" }, { id: 3, name: "Action" }],
      platforms: [
        { platform: { id: 4, name: "PC" } },
        { platform: { id: 187, name: "PlayStation 5" } }
      ],
      tags: [],
      added: 98765,
      year: 2022,
      gotyWinner: true,
      rank: 2
    }
  ];
};