export const getRelativeTime = (dateString) => {
  const date = new Date(dateString);
  const diff = (Date.now() - date.getTime()) / 1000; // segundos
  const units = [
    ["año", 3600 * 24 * 365],
    ["mes", 3600 * 24 * 30],
    ["día", 3600 * 24],
    ["hora", 3600],
    ["minuto", 60],
    ["segundo", 1],
  ];

  for (const [unit, seconds] of units) {
    if (diff >= seconds) {
      const value = Math.floor(diff / seconds);
      return `hace ${value} ${unit}${value > 1 ? "s" : ""}`;
    }
  }
  return "justo ahora";
};