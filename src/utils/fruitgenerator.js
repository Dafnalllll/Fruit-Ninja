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

  const startX = padding + Math.random() * (window.innerWidth - padding * 2);

  const startY = window.innerHeight + 40;

  const targetX = Math.max(
    padding,
    Math.min(window.innerWidth - padding, startX + (Math.random() - 0.5) * 260),
  );

  return {
    startX,
    startY,

    targetX,

    peakY: 160 + Math.random() * 120,

    duration: 1.1 + Math.random() * 0.35,
  };
}

/**
 * Membuat object fruit lengkap.
 */
export function createFruit() {
  const fruit = getRandomFruit();

  const launch = getRandomLaunch();

  return {
    id: crypto.randomUUID(),

    ...fruit,

    ...launch,

    elapsed: 0,

    sliced: false,

    rotation: Math.random() * 360,

    spinSpeed: (Math.random() - 0.5) * 720,

    zOffset: (Math.random() - 0.5) * 12,

    zSin: 0,
  };
}
