import { FaFilter, FaTimes, FaSearch, FaSortAmountDown, FaCheck } from "react-icons/fa";
import { Filters } from "../types";
import { YEARS, GENRES, PLATFORMS, SORT_OPTIONS } from "../utils/constants";

interface FiltersSectionProps {
  filters: Filters;
  activeFilters: number;
  onFilterChange: (key: keyof Filters, value: string) => void;
  onReset: () => void;
}

export const FiltersSection: React.FC<FiltersSectionProps> = ({
  filters,
  activeFilters,
  onFilterChange,
  onReset
}) => {
  return (
    <div className="bg-gradient-to-br from-gray-900/95 to-gray-950/95 backdrop-blur-xl rounded-3xl p-8 mb-10 border border-white/10 shadow-2xl w-full">
      {/* Header mejorado */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-10 gap-6">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-gradient-to-r from-blue-600/30 to-purple-600/30 rounded-2xl shadow-lg">
            <FaFilter className="text-blue-400 text-2xl" />
          </div>
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold text-white flex items-center gap-4">
              Filtros Avanzados
              {activeFilters > 0 && (
                <span className="relative">
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-md animate-pulse"></span>
                  <span className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-2 rounded-full font-bold shadow-lg flex items-center gap-2">
                    <FaCheck className="text-sm" />
                    {activeFilters} filtro{activeFilters !== 1 ? 's' : ''} activo{activeFilters !== 1 ? 's' : ''}
                  </span>
                </span>
              )}
            </h2>
            <p className="text-gray-400 text-base mt-2">Refina tu búsqueda para encontrar los mejores juegos</p>
          </div>
        </div>
        
        {/* Controles de filtro mejorados */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Botón limpiar con mejor diseño */}
          <button
            onClick={onReset}
            className="group px-6 py-3.5 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl hover:scale-105 border border-gray-700 hover:border-gray-600"
          >
            <FaTimes className="group-hover:rotate-90 transition-transform duration-300" />
            <span>Limpiar Filtros</span>
          </button>
          
          {/* Selector de ordenamiento premium */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
            <div className="relative flex items-center">
              <select
                value={filters.sortBy}
                onChange={(e) => onFilterChange("sortBy", e.target.value)}
                className="relative bg-gradient-to-r from-gray-800 to-gray-900 border border-blue-500/50 text-white rounded-xl pl-5 pr-12 py-3.5 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer hover:border-blue-500 transition-all duration-300 shadow-xl w-full min-w-[200px]"
              >
                <option value="" disabled className="bg-gray-900 text-gray-400">Ordenar por...</option>
                {SORT_OPTIONS.map(option => (
                  <option key={option.value} value={option.value} className="bg-gray-900 text-white py-2">
                    {option.label}
                  </option>
                ))}
              </select>
              <FaSortAmountDown className="absolute right-5 top-1/2 -translate-y-1/2 text-blue-400 pointer-events-none text-lg" />
            </div>
          </div>
        </div>
      </div>

      {/* Grid de filtros mejorados */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Filtro de Año con diseño premium */}
        <div className="space-y-3">
          <label className="block text-base font-bold text-white mb-4 flex items-center gap-3">
            <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
            <span>Año de Lanzamiento</span>
          </label>
          <div className="relative">
            <select
              value={filters.year}
              onChange={(e) => onFilterChange("year", e.target.value)}
              className="w-full bg-gradient-to-r from-gray-800/80 to-gray-900/80 border border-gray-700 hover:border-blue-500/50 text-white rounded-xl px-5 py-4 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 appearance-none cursor-pointer shadow-xl hover:shadow-blue-500/20"
            >
              <option value="all" className="bg-gray-900 py-3">🗓️ Todos los años</option>
              {YEARS.map(year => (
                <option key={year} value={year} className="bg-gray-900 py-3 hover:bg-blue-600">
                  {year}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 bg-blue-500 rounded-full"></div>
          </div>
        </div>

        {/* Filtro de Género mejorado */}
        <div className="space-y-3">
          <label className="block text-base font-bold text-white mb-4 flex items-center gap-3">
            <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
            <span>Género</span>
          </label>
          <div className="relative">
            <select
              value={filters.genre}
              onChange={(e) => onFilterChange("genre", e.target.value)}
              className="w-full bg-gradient-to-r from-gray-800/80 to-gray-900/80 border border-gray-700 hover:border-purple-500/50 text-white rounded-xl px-5 py-4 font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 appearance-none cursor-pointer shadow-xl hover:shadow-purple-500/20"
            >
              <option value="all" className="bg-gray-900 py-3">🎮 Todos los géneros</option>
              {GENRES.map(genre => (
                <option key={genre} value={genre} className="bg-gray-900 py-3">
                  {genre}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 bg-purple-500 rounded-full"></div>
          </div>
        </div>

        {/* Filtro de Plataforma mejorado */}
        <div className="space-y-3">
          <label className="block text-base font-bold text-white mb-4 flex items-center gap-3">
            <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
            <span>Plataforma</span>
          </label>
          <div className="relative">
            <select
              value={filters.platform}
              onChange={(e) => onFilterChange("platform", e.target.value)}
              className="w-full bg-gradient-to-r from-gray-800/80 to-gray-900/80 border border-gray-700 hover:border-green-500/50 text-white rounded-xl px-5 py-4 font-semibold focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 appearance-none cursor-pointer shadow-xl hover:shadow-green-500/20"
            >
              <option value="all" className="bg-gray-900 py-3">🖥️ Todas las plataformas</option>
              {PLATFORMS.map(platform => (
                <option key={platform} value={platform} className="bg-gray-900 py-3">
                  {platform}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 bg-green-500 rounded-full"></div>
          </div>
        </div>

        {/* Filtro de Rating mejorado */}
        <div className="space-y-3">
          <label className="block text-base font-bold text-white mb-4 flex items-center gap-3">
            <div className="w-3 h-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full"></div>
            <span>Rating Mínimo</span>
          </label>
          <div className="relative">
            <select
              value={filters.rating}
              onChange={(e) => onFilterChange("rating", e.target.value)}
              className="w-full bg-gradient-to-r from-gray-800/80 to-gray-900/80 border border-gray-700 hover:border-yellow-500/50 text-white rounded-xl px-5 py-4 font-semibold focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 appearance-none cursor-pointer shadow-xl hover:shadow-yellow-500/20"
            >
              <option value="all" className="bg-gray-900 py-3">⭐ Cualquier rating</option>
              <option value="4.5" className="bg-gray-900 py-3">⭐ 4.5+ Excelente</option>
              <option value="4.0" className="bg-gray-900 py-3">⭐ 4.0+ Muy Bueno</option>
              <option value="3.5" className="bg-gray-900 py-3">⭐ 3.5+ Bueno</option>
              <option value="3.0" className="bg-gray-900 py-3">⭐ 3.0+ Aceptable</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 bg-yellow-500 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Indicador visual de filtros activos */}
      {activeFilters > 0 && (
        <div className="mt-8 pt-6 border-t border-white/10">
          <div className="flex items-center justify-center gap-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <p className="text-gray-400 text-sm">
              Mostrando {activeFilters} filtro{activeFilters !== 1 ? 's' : ''} activo{activeFilters !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};