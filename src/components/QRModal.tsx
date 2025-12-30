import { useEffect } from "react";
import { FaTimes, FaDownload, FaShareAlt, FaExternalLinkAlt } from "react-icons/fa";
import { GameWithYear } from "../types";
import QRCode from "react-qr-code";

interface QRModalProps {
  game: GameWithYear;
  onClose: () => void;
}

export const QRModal: React.FC<QRModalProps> = ({ game, onClose }) => {
  // Crear enlace simple a RAWG
  const rawgUrl = `https://rawg.io/games/${game.id}`;
  
  // Texto simple para el QR
  const qrText = `${game.name}\n${rawgUrl}`;

  // Cerrar con Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  // // Prevenir scroll del body
  // useEffect(() => {
  //   document.body.style.overflow = "hidden";
  //   return () => {
  //     document.body.style.overflow = "auto";
  //   };
  // }, []);

  // Descargar QR como PNG
  const downloadQR = () => {
    const svgElement = document.getElementById('qr-svg-element');
    if (!svgElement) return;
    
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    canvas.width = 300;
    canvas.height = 300;
    
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);
    
    img.onload = () => {
      if (ctx) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      }
      
      URL.revokeObjectURL(url);
      
      const pngUrl = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.href = pngUrl;
      downloadLink.download = `${game.name.replace(/\s+/g, '-')}-rawg-qr.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    };
    
    img.src = url;
  };

  // Compartir juego
  const shareGame = () => {
    const shareText = `🎮 ${game.name} (${game.year})\n⭐ Rating: ${game.rating.toFixed(2)}/5\n🔗 ${rawgUrl}`;

    if (navigator.share) {
      navigator.share({
        title: `${game.name} - GOTY Dashboard`,
        text: shareText,
        url: rawgUrl
      });
    } else {
      navigator.clipboard.writeText(shareText);
      alert("¡Enlace y texto copiados al portapapeles!");
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-md"
      onClick={onClose}
    >
      {/* Modal centrado en el viewport usando transform */}
      <div 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-lg p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-gradient-to-br from-gray-900 via-gray-900 to-gray-950 rounded-2xl border border-white/10 shadow-2xl overflow-hidden animate-fade-in">
          {/* Header */}
          <div className="p-6 border-b border-white/10 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-white">Código QR del Juego</h3>
                <p className="text-gray-300 text-sm mt-1">Escanea para ver en RAWG</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-800/50 rounded-lg transition-all"
                aria-label="Cerrar"
              >
                <FaTimes className="text-gray-300 hover:text-white" />
              </button>
            </div>
          </div>

          {/* Contenido */}
          <div className="p-6">
            <div className="flex flex-col items-center">
              {/* Información básica */}
              <div className="text-center mb-6">
                <h4 className="text-xl font-bold text-white mb-2">{game.name}</h4>
                <p className="text-gray-300">
                  {game.gotyWinner ? "🏆 Ganador GOTY" : "🎮 Juego"} • {game.year}
                </p>
              </div>

              {/* QR Code */}
              <div className="bg-white p-5 rounded-xl shadow-xl mb-6">
                <QRCode
                  id="qr-svg-element"
                  value={qrText}
                  size={180}
                  bgColor="#ffffff"
                  fgColor="#1f2937"
                  level="H"
                />
              </div>

              {/* Enlace a RAWG */}
              <a
                href={rawgUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 mb-6 bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 hover:text-white rounded-lg border border-blue-500/30 transition-colors"
              >
                <FaExternalLinkAlt />
                <span className="text-sm">Ver en RAWG.io</span>
              </a>

              {/* Botones de acción */}
              <div className="flex flex-col sm:flex-row gap-3 w-full">
                <button
                  onClick={shareGame}
                  className="flex-1 py-3 bg-gray-800/60 hover:bg-gray-700/60 text-gray-300 hover:text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <FaShareAlt />
                  Compartir
                </button>
                
                <button
                  onClick={downloadQR}
                  className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl font-medium transition-all flex items-center justify-center gap-2"
                >
                  <FaDownload />
                  Descargar QR
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};