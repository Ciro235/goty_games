import { useGames } from "./hooks/useGames";
import { useFilters } from "./hooks/useFilters";
import { LoadingScreen } from "./components/LoadingScreen";
import { Header } from "./components/Header";
import { StatsOverview } from "./components/StatsOverview";
import { FiltersSection } from "./components/FiltersSection";
import { GamesGrid } from "./components/GamesGrid";
import { Footer } from "./components/Footer";
import { FaExclamationTriangle, FaRocket } from "react-icons/fa";

const App: React.FC = () => {
  const {
    games,
    loading,
    error,
    apiStatus,
    fetchGames,
    calculateStats,
    getYearStats,
    getGenreStats
  } = useGames();

  const {
    filters,
    filteredGames,
    activeFilters,
    updateFilter,
    resetFilters
  } = useFilters(games);

  const stats = calculateStats(games);
  const yearStats = getYearStats(games);
  const genreStats = getGenreStats(games);

  if (loading) return <LoadingScreen />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-blue-950/20 to-purple-950/20 relative overflow-hidden">
      {/* Efectos de fondo decorativos RESTAURADOS */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        {/* Efecto de partículas sutiles */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full"></div>
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-blue-400 rounded-full"></div>
          <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
          <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-cyan-400 rounded-full"></div>
        </div>
      </div>

      {/* Contenido principal centrado */}
      <div className="relative z-10 min-h-screen flex flex-col">
        <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          {/* Header centrado */}
          <div className="w-full flex justify-center mb-10 lg:mb-14">
            <div className="w-full max-w-6xl">
              <Header apiStatus={apiStatus} onRefresh={fetchGames} />
            </div>
          </div>
          
          {/* Mensaje de error */}
          {error && (
            <div className="w-full flex justify-center mb-8">
              <div className="w-full max-w-6xl">
                <div className="p-5 bg-gradient-to-r from-red-900/40 to-orange-900/40 backdrop-blur-sm border border-red-500/30 rounded-2xl shadow-2xl animate-fade-in">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-red-500/20 rounded-xl">
                      <FaExclamationTriangle className="text-red-400 text-xl" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-red-200 text-lg mb-1">Advertencia</h4>
                      <p className="text-red-300/90">{error}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Contenido principal en layout centrado */}
          <div className="w-full flex justify-center">
            <div className="w-full max-w-7xl space-y-10 lg:space-y-14">
              {/* Stats Overview con fondo mejorado */}
              <div className="w-full transform transition-all duration-500 hover:scale-[1.01]">
                <div className="bg-gradient-to-br from-gray-900/90 to-gray-950/90 backdrop-blur-sm rounded-3xl border border-white/10 shadow-2xl p-2">
                  <StatsOverview 
                    stats={stats} 
                    yearStats={yearStats} 
                    genreStats={genreStats} 
                  />
                </div>
              </div>
              
              {/* Filters Section */}
              <div className="w-full">
                <FiltersSection
                  filters={filters}
                  activeFilters={activeFilters}
                  onFilterChange={updateFilter}
                  onReset={resetFilters}
                />
              </div>
              
              {/* Games Grid */}
              <div className="w-full">
                <div className="bg-gradient-to-br from-gray-900/50 to-gray-950/50 backdrop-blur-sm rounded-3xl border border-white/10 shadow-2xl p-6">
                  <GamesGrid games={filteredGames} totalGames={games.length} />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="w-full mt-16">
          <Footer />
        </div>
      </div>

      {/* Botón flotante de recarga MEJORADO */}
      <button
        onClick={fetchGames}
        className="fixed bottom-6 right-6 z-40 group"
        aria-label="Recargar juegos"
      >
        <div className="relative">
          {/* Efecto de pulso */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-md opacity-70 animate-ping"></div>
          {/* Botón principal */}
          <div className="relative px-5 py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-bold shadow-2xl hover:shadow-blue-500/50 hover:scale-110 transition-all duration-300 flex items-center gap-3 group-hover:from-blue-500 group-hover:to-purple-500">
            <FaRocket className="group-hover:rotate-180 transition-transform duration-500 text-lg" />
            <span className="hidden sm:inline">Recargar Datos</span>
            <span className="sm:hidden">↻</span>
          </div>
        </div>
      </button>
    </div>
  );
};

export default App;