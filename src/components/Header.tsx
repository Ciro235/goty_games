import { FaTrophy, FaExternalLinkAlt, FaChartLine, FaRocket } from "react-icons/fa";

interface HeaderProps {
  apiStatus: 'idle' | 'loading' | 'success' | 'error';
  onRefresh: () => void;
}

export const Header: React.FC<HeaderProps> = ({ apiStatus, onRefresh }) => {
  return (
    <header className="relative mb-8 animate-fade-in">
      {/* Fondo con efecto glass */}
      <div className="relative bg-gradient-to-br from-gray-900/95 via-blue-900/90 to-purple-900/95 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl overflow-hidden">
        {/* Efectos de fondo decorativos */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Logo y título */}
          <div className="flex items-center gap-5">
            <div className="relative group">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Icono */}
              <div className="relative p-4 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-2xl shadow-2xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <FaTrophy className="text-3xl text-white" />
              </div>
            </div>
            
            <div>
              <h1 className="text-4xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                🎮 Dashboard GOTY Pro
              </h1>
              <p className="text-gray-300 text-base font-medium flex items-center gap-2">
                <FaChartLine className="text-blue-400" />
                Análisis avanzado de Game of the Year Awards
              </p>
            </div>
          </div>
          
          {/* Status y acciones */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* Badge de status con animaciones */}
            <div className={`relative px-5 py-2.5 rounded-full text-sm font-bold shadow-lg transition-all duration-300 ${
              apiStatus === 'success' 
                ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-green-500/50' :
              apiStatus === 'error' 
                ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-red-500/50' :
              apiStatus === 'loading'
                ? 'bg-gradient-to-r from-yellow-600 to-amber-600 text-white shadow-yellow-500/50 animate-pulse' :
                'bg-gradient-to-r from-gray-600 to-gray-700 text-white'
            }`}>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${
                  apiStatus === 'success' ? 'bg-green-300 animate-pulse' :
                  apiStatus === 'error' ? 'bg-red-300' :
                  apiStatus === 'loading' ? 'bg-yellow-300 animate-ping' :
                  'bg-gray-300'
                }`}></div>
                <span>
                  {apiStatus === 'success' ? '✅ API Conectada' :
                   apiStatus === 'error' ? '⚠️ Modo Demo' : 
                   apiStatus === 'loading' ? '🔄 Conectando...' : '⏸️ Inactivo'}
                </span>
              </div>
            </div>
            
            {/* Botón de actualizar mejorado */}
            <button
              onClick={onRefresh}
              disabled={apiStatus === 'loading'}
              className="group relative px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-bold shadow-lg hover:shadow-xl hover:shadow-blue-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
            >
              {/* Efecto de brillo */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
              
              <div className="relative flex items-center gap-2">
                <FaExternalLinkAlt className="group-hover:rotate-12 transition-transform duration-300" />
                <span>Actualizar Datos</span>
              </div>
            </button>
          </div>
        </div>

        {/* Barra decorativa inferior */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"></div>
      </div>
    </header>
  );
};