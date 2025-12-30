import { useState, useEffect } from "react";
import { GameWithYear} from "../types";
import { Filters } from '../types/index';

export const useFilters = (games: GameWithYear[]) => {
  const [filters, setFilters] = useState<Filters>({
    year: "all",
    genre: "all",
    platform: "all",
    rating: "all",
    sortBy: "year_desc",
  });

  const [filteredGames, setFilteredGames] = useState<GameWithYear[]>([]);
  const [activeFilters, setActiveFilters] = useState(0);

  const applyFilters = () => {
    let result = [...games];

    // Aplicar filtros
    if (filters.year !== "all") {
      result = result.filter(game => game.year === parseInt(filters.year));
    }

    if (filters.genre !== "all") {
      result = result.filter(game => 
        game.genres.some(g => g.name.toLowerCase() === filters.genre.toLowerCase())
      );
    }

    if (filters.platform !== "all") {
      result = result.filter(game =>
        game.platforms.some(p => 
          p.platform.name.toLowerCase().includes(filters.platform.toLowerCase())
        )
      );
    }

    if (filters.rating !== "all") {
      const minRating = parseFloat(filters.rating);
      result = result.filter(game => game.rating >= minRating);
    }

    // Ordenar
    result.sort((a, b) => {
      switch (filters.sortBy) {
        case "year_desc":
          return b.year - a.year;
        case "year_asc":
          return a.year - b.year;
        case "rating_desc":
          return b.rating - a.rating;
        case "rating_asc":
          return a.rating - b.rating;
        case "metacritic_desc":
          return (b.metacritic || 0) - (a.metacritic || 0);
        default:
          return b.year - a.year;
      }
    });

    setFilteredGames(result);
  };

  const updateActiveFilters = () => {
    const active = Object.values(filters).filter(
      value => value !== "all" && value !== "year_desc"
    ).length;
    setActiveFilters(active);
  };

  const updateFilter = (key: keyof Filters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({
      year: "all",
      genre: "all",
      platform: "all",
      rating: "all",
      sortBy: "year_desc",
    });
  };

  useEffect(() => {
    applyFilters();
    updateActiveFilters();
  }, [games, filters]);

  return {
    filters,
    filteredGames,
    activeFilters,
    updateFilter,
    resetFilters
  };
};