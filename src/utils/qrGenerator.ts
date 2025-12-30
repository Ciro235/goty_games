interface GameData {
  id: number;
  name: string;
  year: number;
  rating: number;
  metacritic?: number | null;
  genres: { name: string }[];
  released: string;
  playtime: number;
  platforms: { platform: { name: string } }[];
}

export const generateQRCode = (gameData: GameData): string => {
  // Formato mejorado con más información
  const qrContent = `
🎮 ${gameData.name}
📅 Año: ${gameData.year}
⭐ Rating: ${gameData.rating.toFixed(2)}/5.0
🏆 Metacritic: ${gameData.metacritic || "N/A"}
🎭 Géneros: ${gameData.genres.map(g => g.name).join(", ")}
⏱️ Tiempo: ${gameData.playtime}h
🕹️ Plataformas: ${gameData.platforms.map(p => p.platform.name).join(", ")}
📅 Lanzamiento: ${new Date(gameData.released).toLocaleDateString()}

🔗 URL: https://rawg.io/games/${gameData.id}

📱 Escaneado desde GOTY Dashboard
`;

  const encodedContent = encodeURIComponent(qrContent.trim());
  return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodedContent}&format=png&margin=10`;
};

export const generateQRDataURL = async (gameData: GameData): Promise<string> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      reject(new Error('Canvas no disponible'));
      return;
    }

    // Configurar canvas
    canvas.width = 300;
    canvas.height = 300;
    
    // Fondo
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, 300, 300);
    
    // Generar QR simple (podrías usar una librería QR aquí)
    const qrText = `${gameData.name} | ${gameData.year} | Rating: ${gameData.rating.toFixed(2)}`;
    
    // Simular código QR con texto (para fallback)
    ctx.fillStyle = '#000000';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('QR CODE', 150, 140);
    ctx.fillText(gameData.name.substring(0, 20), 150, 160);
    ctx.fillText(`${gameData.rating.toFixed(2)}/5.0 | ${gameData.year}`, 150, 180);
    
    resolve(canvas.toDataURL('image/png'));
  });
};

export const shareGameText = (gameData: GameData): string => {
  return `🎮 ${gameData.name} (${gameData.year})
⭐ Rating: ${gameData.rating.toFixed(2)}/5.0
🏆 Metacritic: ${gameData.metacritic || "N/A"}
🎭 Géneros: ${gameData.genres.map(g => g.name).join(", ")}
⏱️ Tiempo de juego: ${gameData.playtime}h

Descubre este y más juegos en el Dashboard GOTY!`;
};

export const shareGameData = (gameData: GameData) => {
  const text = shareGameText(gameData);
  const url = `https://rawg.io/games/${gameData.id}`;
  
  return {
    title: `${gameData.name} - GOTY Dashboard`,
    text,
    url,
    files: [] // Para futuras implementaciones con imagen
  };
};