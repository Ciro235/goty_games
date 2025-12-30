import { FaHeart, FaGithub, FaGamepad, FaRocket } from "react-icons/fa";

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 pt-8 border-t border-white/10">
      {/* Fondo oscuro para mejor contraste */}
      <div className="relative overflow-hidden rounded-2xl">
        {/* Fondo con opacidad aumentada */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-black/95 backdrop-blur-xl"></div>
        
        {/* Efectos sutiles */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20"></div>

        {/* Contenido del footer */}
        <div className="relative z-10 p-8 md:p-10">
          <div className="max-w-7xl mx-auto">
            {/* Logo y descripción */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-8">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl">
                    <FaGamepad className="text-blue-400 text-xl" />
                  </div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                    GOTY Dashboard
                  </h2>
                </div>
                <p className="text-gray-300 max-w-lg">
                  Tu fuente definitiva de información sobre los mejores juegos del año. 
                  Desde ganadores del GOTY hasta títulos populares, todo en un solo lugar.
                </p>
              </div>

              {/* Stats rápidas */}
              <div className="flex gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">12+</div>
                  <div className="text-sm text-gray-400">Años GOTY</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">50+</div>
                  <div className="text-sm text-gray-400">Juegos</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">24/7</div>
                  <div className="text-sm text-gray-400">Actualizado</div>
                </div>
              </div>
            </div>

            {/* Separador */}
            <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-8"></div>

            {/* Enlaces y créditos */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="flex items-center gap-2 text-gray-400">
                  <FaHeart className="text-red-400 animate-pulse" />
                  <span>Hecho con pasión por los videojuegos</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaRocket className="text-blue-400" />
                  <span className="text-sm text-gray-300">Powered by RAWG API</span>
                </div>
              </div>

              {/* Enlaces sociales */}
              <div className="flex gap-4">
                <a
                  href="https://github.com/Ciro235"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-800/60 hover:bg-gray-700/60 rounded-xl transition-all duration-300 hover:scale-110 group"
                  aria-label="GitHub"
                >
                  <FaGithub className="text-gray-300 group-hover:text-white text-lg" />
                </a>
                <a
                  href="https://rawg.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3 bg-gradient-to-r from-blue-600/20 to-purple-600/20 hover:from-blue-600/30 hover:to-purple-600/30 text-white rounded-xl font-medium transition-all duration-300 border border-blue-500/30 hover:border-blue-400/50"
                >
                  RAWG API
                </a>
              </div>
            </div>

            {/* Copyright */}
            <div className="mt-8 pt-6 border-t border-white/5 text-center">
              <p className="text-gray-500 text-sm">
                © {new Date().getFullYear()} GOTY Dashboard. Todos los datos son propiedad de sus respectivos dueños.
                Este es un proyecto educativo y de demostración.
              </p>
              <p className="text-gray-600 text-xs mt-2">
                Diseñado para la mejor experiencia en gaming • Actualizado constantemente
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};