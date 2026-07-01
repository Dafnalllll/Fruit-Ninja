const HIGH_SCORE_KEY = "fruit_ninja_high_score";

export function loadHighScore() {
  return Number(localStorage.getItem(HIGH_SCORE_KEY)) || 0;
}

export function saveHighScore(score) {
  localStorage.setItem(HIGH_SCORE_KEY, score);
}

export function clearHighScore() {
  localStorage.removeItem(HIGH_SCORE_KEY);
}
