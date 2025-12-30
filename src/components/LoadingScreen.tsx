import { FaTrophy, FaGamepad, FaStar, FaCrown } from "react-icons/fa";

export const LoadingScreen: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-blue-950 to-purple-950 flex items-center justify-center relative overflow-hidden">
      {/* Partículas de fondo animadas */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-500/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      <div className="text-center space-y-8 z-10 px-4">
        {/* Spinner principal con múltiples anillos */}
        <div className="relative inline-block">
          {/* Anillo exterior */}
          <div className="w-32 h-32 border-4 border-blue-500/20 rounded-full animate-spin-slow"></div>
          {/* Anillo medio */}
          <div className="absolute inset-2 w-28 h-28 border-4 border-purple-500/30 rounded-full animate-spin-reverse"></div>
          {/* Anillo interior */}
          <div className="absolute inset-4 w-24 h-24 border-4 border-pink-500/40 rounded-full animate-spin"></div>
          
          {/* Icono central con animación */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <FaTrophy className="text-5xl text-yellow-400 animate-pulse-scale" />
              <div className="absolute inset-0 blur-xl bg-yellow-400/50 animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Texto con gradiente animado */}
        <div className="space-y-4">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
            Cargando Dashboard GOTY
          </h2>
          <p className="text-gray-400 text-lg font-medium animate-pulse">
            Obteniendo los mejores juegos de la década...
          </p>
          
          {/* Barra de progreso animada */}
          <div className="w-80 max-w-full mx-auto h-3 bg-gray-800/50 rounded-full overflow-hidden backdrop-blur-sm border border-white/10">
            <div className="h-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-progress-bar rounded-full shadow-lg shadow-blue-500/50">
              <div className="h-full w-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
            </div>
          </div>

          {/* Iconos flotantes */}
          <div className="flex justify-center gap-6 mt-8">
            <FaGamepad className="text-3xl text-blue-400 animate-bounce" style={{ animationDelay: '0s' }} />
            <FaStar className="text-3xl text-yellow-400 animate-bounce" style={{ animationDelay: '0.2s' }} />
            <FaCrown className="text-3xl text-purple-400 animate-bounce" style={{ animationDelay: '0.4s' }} />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) translateX(50px);
            opacity: 0;
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes spin-reverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }

        @keyframes pulse-scale {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }

        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes progress-bar {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(400%);
          }
        }

        .animate-float {
          animation: float linear infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }

        .animate-spin-reverse {
          animation: spin-reverse 2s linear infinite;
        }

        .animate-pulse-scale {
          animation: pulse-scale 2s ease-in-out infinite;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }

        .animate-progress-bar {
          animation: progress-bar 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};