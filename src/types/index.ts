// /src/types/index.ts

export interface GameData {
  id: number;
  name: string;
  released: string;
  rating: number;
  rating_top: number;
  ratings_count: number;
  metacritic: number | null;
  playtime: number;
  background_image: string;
  genres: { id: number; name: string }[];
  platforms: { platform: { id: number; name: string } }[];
  tags: { id: number; name: string; language: string }[];
  esrb_rating?: { id: number; name: string };
  added: number;
}

export interface GameWithYear extends GameData {
  year: number;
  gotyWinner: boolean;
  rank: number;
}

export interface Filters {
  year: string;
  genre: string;
  platform: string;
  rating: string;
  sortBy: string;
}

export interface Stats {
  totalGames: number;
  averageRating: number;
  averageMetacritic: number;
  totalPlaytime: number;
  topGenre: string;
  mostPopularYear: number;
}

// Opcional: puedes añadir más exportaciones si las necesitas
export type SortOption = 'year_desc' | 'year_asc' | 'rating_desc' | 'rating_asc' | 'metacritic_desc';