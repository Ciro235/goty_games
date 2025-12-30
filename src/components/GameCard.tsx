import { useState } from "react";
import { FaCalendarAlt, FaStar, FaGamepad, FaClock, FaUsers, FaCrown, FaExpand, FaCompress } from "react-icons/fa";
import { GameWithYear } from "../types";

interface GameCardProps {
  game: GameWithYear;
  index: number;
}

export const GameCard: React.FC<GameCardProps> = ({ game, index }) => {
  const [imageError, setImageError] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  
  const releaseYear = new Date(game.released).getFullYear();
  const ratingPercentage = (game.rating / 5) * 100;
  
  // Imagen optimizada con tamaño fijo para consistencia
  const getImageUrl = () => {
    if (imageError) {
      return `https://images.unsplash.com/photo-1550745165-9bc0b252726f?fit=crop&w=600&h=400&q=80`;
    }
    // Para otras imágenes, usar tamaño consistente
    return game.background_image?.replace('media/games', 'media/crop/600/400/games') || 
           `https://images.unsplash.com/photo-1550745165-9bc0b252726f?fit=crop&w=600&h=400&q=80`;
  };

  const imageUrl = getImageUrl();

  return (
    <div 
      className={`group relative bg-gradient-to-br from-gray-900/90 via-gray-800/90 to-gray-900/90 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-blue-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/20 animate-fade-in w-full ${
        isExpanded ? 'col-span-full md:col-span-2 lg:col-span-3' : ''
      }`}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Imagen con tamaño fijo y consistente */}
      <div className={`relative overflow-hidden bg-gray-900 ${
        isExpanded ? 'h-80 md:h-96' : 'h-56 sm:h-64 md:h-72'
      }`}>
        <img
          src={imageUrl}
          alt={game.name}
          onError={() => setImageError(true)}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        
        {/* Overlay gradiente sutil */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
        
        {/* Insignia GOTY elegante y discreta */}
        {game.gotyWinner && (
          <div className="absolute top-2 left-2 z-20">
            <div className="relative group/badge">
              {/* Fondo brillante sutil */}
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 rounded-lg blur-sm opacity-0 group-hover/badge:opacity-100 transition-opacity duration-300"></div>
              
              {/* Insignia GOTY elegante */}
              <div className="relative bg-gradient-to-r from-yellow-600/90 via-yellow-500/90 to-yellow-400/90 backdrop-blur-sm text-gray-900 px-4 py-0.5 rounded-lg flex items-center gap-1 shadow-xl border border-yellow-300/50">
                <FaCrown className="text-yellow-800 text-sm animate-pulse" />
                <div className="flex flex-col">
                  <div className="text-xs font-black tracking-wider">GOTY</div>
                  <div className="text-xs font-bold">{game.year}</div>
                </div>
              </div>
              
              {/* Efecto de brillo en hover */}
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-yellow-400/30 blur-sm opacity-0 group-hover/badge:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
        )}
        
        {/* Controles de imagen - SIEMPRE VISIBLES */}
        <div className="absolute top-4 right-4 z-20 flex gap-2">
          {/* Botón Expandir/Contraer - SIEMPRE FUNCIONAL */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2.5 bg-black/50 backdrop-blur-md rounded-full hover:bg-black/70 transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-purple-500/30 group/expand"
            aria-label={isExpanded ? "Contraer imagen" : "Expandir imagen"}
            title={isExpanded ? "Contraer imagen" : "Expandir imagen"}
          >
            {isExpanded ? (
              <FaCompress className="text-white text-base group-hover/expand:text-purple-300 transition-colors duration-300" />
            ) : (
              <FaExpand className="text-white text-base group-hover/expand:text-purple-300 transition-colors duration-300" />
            )}
          </button>
        </div>
        
        {/* Título y Metacritic */}
        <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
          <div className="flex justify-between items-end gap-3">
            <h3 className="text-lg md:text-xl font-bold text-white drop-shadow-2xl flex-1 line-clamp-2 group-hover:text-blue-400 transition-colors duration-300">
              {game.name}
            </h3>
            {game.metacritic && (
              <div className={`px-3 py-1.5 rounded-xl font-bold shadow-2xl backdrop-blur-sm min-w-[55px] text-center ${
                game.metacritic >= 90 ? 'bg-gradient-to-br from-green-600/90 to-green-700/90 text-white' :
                game.metacritic >= 80 ? 'bg-gradient-to-br from-yellow-600/90 to-yellow-700/90 text-white' :
                game.metacritic >= 70 ? 'bg-gradient-to-br from-orange-600/90 to-orange-700/90 text-white' : 
                'bg-gradient-to-br from-red-600/90 to-red-700/90 text-white'
              }`}>
                <div className="text-[10px] font-semibold uppercase tracking-wider">Meta</div>
                <div className="text-base font-black">{game.metacritic}</div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Contenido de la tarjeta */}
      <div className="p-5 sm:p-6 space-y-4">
        {/* Información principal */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2 text-gray-300 text-sm">
            <div className="flex items-center gap-1.5 bg-gray-800/50 px-3 py-1.5 rounded-lg">
              <FaCalendarAlt className="text-blue-400" />
              <span className="font-semibold">{releaseYear}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-gray-800/50 px-3 py-1.5 rounded-lg">
              <FaGamepad className="text-purple-400" />
              <span className="font-semibold truncate max-w-[120px] sm:max-w-[150px]">
                {game.genres.slice(0, 2).map(g => g.name).join(", ")}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-yellow-600/20 to-yellow-500/20 rounded-lg border border-yellow-500/30">
            <FaStar className="text-yellow-400 animate-pulse" />
            <span className="font-black text-white text-base sm:text-lg">{game.rating.toFixed(2)}</span>
            <span className="text-gray-400 text-sm">/5.0</span>
          </div>
        </div>
        
        {/* Barra de rating mejorada */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs sm:text-sm">
            <span className="font-medium text-gray-300">Valoración de usuarios</span>
            <span className="font-bold text-white">{game.rating.toFixed(2)}/5.0</span>
          </div>
          <div className="relative w-full bg-gray-800 rounded-full h-2 sm:h-2.5 overflow-hidden shadow-inner">
            <div 
              className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full transition-all duration-1000 shadow-lg"
              style={{ width: `${ratingPercentage}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-shimmer"></div>
            </div>
          </div>
        </div>
        
        {/* Plataformas con mejor visualización */}
        <div>
          <div className="text-xs sm:text-sm font-medium text-gray-300 mb-2">Plataformas disponibles</div>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {game.platforms.slice(0, 5).map((p, i) => (
              <span 
                key={i} 
                className="px-2.5 sm:px-3 py-1 bg-gradient-to-r from-gray-800 to-gray-700 text-gray-200 rounded-lg text-xs font-semibold border border-white/5 hover:border-blue-500/50 transition-all duration-300 hover:scale-105 hover:shadow-sm"
              >
                {p.platform.name.length > 12 
                  ? p.platform.name.substring(0, 10) + '...' 
                  : p.platform.name}
              </span>
            ))}
            {game.platforms.length > 5 && (
              <span className="px-2.5 sm:px-3 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg text-xs font-bold">
                +{game.platforms.length - 5}
              </span>
            )}
          </div>
        </div>
        
        {/* Estadísticas del juego */}
        <div className="flex items-center justify-between pt-3 border-t border-white/10">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-2 text-gray-300">
              <FaClock className="text-blue-400" />
              <div>
                <div className="text-[10px] sm:text-xs text-gray-400">Tiempo</div>
                <div className="text-sm sm:text-base font-bold">{game.playtime}h</div>
              </div>
            </div>
            <div className="h-6 w-px bg-gray-700"></div>
            <div className="flex items-center gap-2 text-gray-300">
              <FaUsers className="text-purple-400" />
              <div>
                <div className="text-[10px] sm:text-xs text-gray-400">Votos</div>
                  <div className="text-sm sm:text-base font-bold">
                    {game.ratings_count > 1000 
                      ? `${(game.ratings_count / 1000).toFixed(1)}k` 
                      : game.ratings_count}
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Indicador de expansión */}
      {isExpanded && (
        <div className="absolute bottom-2 right-2 px-2 py-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs font-bold rounded-full">
          Expandido
        </div>
      )}

      {/* Efecto de brillo en hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/0 via-blue-500/5 to-purple-500/0"></div>
      </div>
    </div>
  );
};