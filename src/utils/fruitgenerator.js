import { FRUIT_TYPES } from "../constants/fruit";
import { BOMB } from "../constants/bomb";

/**
 * Mengambil buah secara acak.
 * Memiliki peluang bomb sekitar 12%.
 */
export function getRandomFruit(bombChance = 0.12) {
  if (Math.random() < bombChance) {
    return { ...BOMB };
  }

  const idx = Math.floor(Math.random() * FRUIT_TYPES.length);
  return { ...FRUIT_TYPES[idx] };
}

/**
 * Menghasilkan parameter lintasan buah.
 */
export function getRandomLaunch() {
  const padding = 80;

  // Spawn dari seluruh lebar bawah layar
  const startX = padding + Math.random() * (window.innerWidth - padding * 2);

  const startY = window.innerHeight + 40;

  // Target melebar — buah meloncat ke kiri/kanan
  const targetX = Math.max(
    padding,
    Math.min(
      window.innerWidth - padding,
      startX + (Math.random() - 0.5) * window.innerWidth * 0.5,
    ),
  );

  return {
    startX,
    startY,
    targetX,
    peakY: window.innerHeight * (0.7 + Math.random() * 0.2),
    duration: 1.75 + Math.random() * 1.0,
  };
}

/**
 * Membuat object fruit lengkap.
 */
export function createFruit(elapsed = 0) {
  const fruit = getRandomFruit();
  const launch = getRandomLaunch();

  return {
    id: crypto.randomUUID(),

    ...fruit,
    ...launch,

    // posisi awal
    x: launch.startX,
    y: launch.startY,

    // transform
    scale: 1,
    rotation: Math.random() * 360,
    spinSpeed: (Math.random() - 0.5) * 720,
    zOffset: (Math.random() - 0.5) * 12,
    zSin: 0,

    // game state
    elapsed,
    sliced: false,
  };
}
