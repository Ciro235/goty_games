import { FaGamepad, FaCrown, FaShieldAlt, FaFire, FaStar, FaChartLine, FaTrophy } from "react-icons/fa";
import { Stats } from "../types";
import { COLORS } from "../utils/constants";

interface StatsOverviewProps {
  stats: Stats;
  yearStats: Array<{ year: number; count: number; avgRating: number; winners: number }>;
  genreStats: Array<{ name: string; value: number }>;
}

export const StatsOverview: React.FC<StatsOverviewProps> = ({ stats, yearStats, genreStats }) => {
  return (
    <div className="space-y-8 mb-8">
      {/* Cards de estadísticas principales */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Games */}
        <div 
          className="group relative bg-gradient-to-br from-blue-900/40 to-blue-950/40 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/20 hover:border-blue-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/30 animate-slide-up overflow-hidden"
          style={{ animationDelay: '100ms' }}
        >
          {/* Efecto de brillo */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="p-4 bg-blue-500/20 rounded-2xl group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <FaGamepad className="text-blue-400 text-2xl" />
              </div>
              <span className="text-5xl font-black bg-gradient-to-br from-blue-400 to-blue-600 bg-clip-text text-transparent">
                {stats.totalGames}
              </span>
            </div>
            <h3 className="font-bold text-white text-lg mb-1">Juegos Analizados</h3>
            <p className="text-blue-300/70 text-sm font-medium">Base de datos completa</p>
          </div>

          {/* Decoración */}
          <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl"></div>
        </div>

        {/* Average Rating */}
        <div 
          className="group relative bg-gradient-to-br from-purple-900/40 to-purple-950/40 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20 hover:border-purple-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/30 animate-slide-up overflow-hidden"
          style={{ animationDelay: '200ms' }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="p-4 bg-purple-500/20 rounded-2xl group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <FaCrown className="text-purple-400 text-2xl" />
              </div>
              <div className="text-right">
                <span className="text-5xl font-black bg-gradient-to-br from-purple-400 to-purple-600 bg-clip-text text-transparent">
                  {stats.averageRating.toFixed(1)}
                </span>
                <span className="text-purple-300/70 text-xl font-bold ml-1">/5</span>
              </div>
            </div>
            <h3 className="font-bold text-white text-lg mb-2">Rating Promedio</h3>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <FaStar 
                  key={i} 
                  className={`${i < Math.floor(stats.averageRating) ? "text-yellow-400" : "text-gray-600"} transition-all duration-300 group-hover:scale-110`}
                  style={{ transitionDelay: `${i * 50}ms` }}
                />
              ))}
            </div>
          </div>

          <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl"></div>
        </div>

        {/* Metacritic Average */}
        <div 
          className="group relative bg-gradient-to-br from-green-900/40 to-green-950/40 backdrop-blur-sm rounded-2xl p-6 border border-green-500/20 hover:border-green-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/30 animate-slide-up overflow-hidden"
          style={{ animationDelay: '300ms' }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 via-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="p-4 bg-green-500/20 rounded-2xl group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <FaShieldAlt className="text-green-400 text-2xl" />
              </div>
              <span className="text-5xl font-black bg-gradient-to-br from-green-400 to-green-600 bg-clip-text text-transparent">
                {Math.round(stats.averageMetacritic)}
              </span>
            </div>
            <h3 className="font-bold text-white text-lg mb-1">Metacritic Avg</h3>
            <p className="text-green-300/70 text-sm font-medium">Puntuación crítica</p>
          </div>

          <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-green-500/10 rounded-full blur-2xl"></div>
        </div>

        {/* Top Genre */}
        <div 
          className="group relative bg-gradient-to-br from-orange-900/40 to-orange-950/40 backdrop-blur-sm rounded-2xl p-6 border border-orange-500/20 hover:border-orange-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/30 animate-slide-up overflow-hidden"
          style={{ animationDelay: '400ms' }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 via-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="p-4 bg-orange-500/20 rounded-2xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg">
                <FaFire className="text-orange-400 text-2xl" />
              </div>
              <FaTrophy className="text-4xl text-orange-400/30 group-hover:text-orange-400/50 transition-colors duration-300" />
            </div>
            <h3 className="font-bold text-white text-lg mb-1">Género Top</h3>
            <p className="text-2xl font-black bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
              {stats.topGenre}
            </p>
          </div>

          <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-orange-500/10 rounded-full blur-2xl"></div>
        </div>
      </div>

      {/* Gráficos de distribución */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Géneros Principales */}
        <div className="bg-gradient-to-br from-gray-900/95 to-gray-950/95 backdrop-blur-sm rounded-2xl p-8 border border-white/10 shadow-2xl hover:shadow-purple-500/10 transition-all duration-500">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <div className="p-2 bg-purple-500/20 rounded-xl">
              <FaChartLine className="text-purple-400 text-xl" />
            </div>
            Géneros Principales
          </h3>
          <div className="space-y-5">
            {genreStats.map((genre, index) => {
              const maxValue = Math.max(...genreStats.map(g => g.value));
              const percentage = (genre.value / maxValue) * 100;
              
              return (
                <div 
                  key={genre.name} 
                  className="group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-4 h-4 rounded-full shadow-lg group-hover:scale-125 transition-transform duration-300"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      ></div>
                      <span className="text-white font-semibold">{genre.name}</span>
                    </div>
                    <span className="text-gray-400 font-medium">{genre.value} juegos</span>
                  </div>
                  <div className="relative w-full bg-gray-800/50 rounded-full h-3 overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-1000 ease-out shadow-lg relative overflow-hidden group-hover:shadow-2xl"
                      style={{ 
                        width: `${percentage}%`,
                        backgroundColor: COLORS[index % COLORS.length]
                      }}
                    >
                      {/* Efecto shimmer */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};