import { FaSearch, FaGamepad } from "react-icons/fa";
import { GameWithYear } from "../types";
import { GameCard } from "./GameCard";

interface GamesGridProps {
  games: GameWithYear[];
  totalGames: number;
}

export const GamesGrid: React.FC<GamesGridProps> = ({ games, totalGames }) => {
  return (
    <div className="mb-12">
      {/* Header del grid */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-black text-white flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
              <FaGamepad className="text-white text-xl" />
            </div>
            Catálogo de Juegos
            <span className="text-gray-500 font-normal text-2xl">({games.length})</span>
          </h2>
          <p className="text-gray-400 mt-2 text-sm">
            Explora la colección completa de ganadores y nominados
          </p>
        </div>
        
        {/* Contador de resultados */}
        <div className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl border border-white/10 shadow-lg">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-gray-400 font-medium">Mostrando</span>
          </div>
          <span className="text-white font-bold text-lg">{games.length}</span>
          <span className="text-gray-400 font-medium">de</span>
          <span className="text-white font-bold text-lg">{totalGames}</span>
          <span className="text-gray-400 font-medium">juegos</span>
        </div>
      </div>
      
      {/* Grid o mensaje vacío */}
      {games.length === 0 ? (
        <div className="bg-gradient-to-br from-gray-900/95 to-gray-950/95 backdrop-blur-sm rounded-3xl p-16 text-center border border-white/10 shadow-2xl">
          <div className="max-w-md mx-auto space-y-6">
            {/* Icono animado */}
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-2xl animate-pulse"></div>
              <div className="relative p-8 bg-gray-800/50 rounded-full">
                <FaSearch className="text-6xl text-gray-500 animate-bounce" />
              </div>
            </div>
            
            {/* Mensaje */}
            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-white">
                No se encontraron juegos
              </h3>
              <p className="text-gray-400 text-lg">
                Intenta ajustar los filtros para ver más resultados
              </p>
            </div>

            {/* Sugerencias */}
            <div className="mt-8 p-6 bg-blue-500/5 rounded-2xl border border-blue-500/20">
              <p className="text-blue-300 text-sm font-medium mb-3">💡 Sugerencias:</p>
              <ul className="text-left text-gray-400 text-sm space-y-2">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                  Prueba con un año diferente
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                  Cambia el género seleccionado
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                  Reduce el rating mínimo
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                  Limpia todos los filtros
                </li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {games.map((game, index) => (
            <GameCard key={game.id} game={game} index={index} />
          ))}
        </div>
      )}
    </div>
  );
};