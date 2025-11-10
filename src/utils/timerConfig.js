export const DEFAULT_COUNTDOWN_SECONDS = 3;

let countdownSeconds = DEFAULT_COUNTDOWN_SECONDS;

export function getTimerSeconds() {
  return countdownSeconds;
}

export function setTimerSeconds(seconds) {
  if (typeof seconds !== "number" || Number.isNaN(seconds) || seconds < 0) {
    throw new Error("Countdown seconds must be a non-negative number.");
  }
  countdownSeconds = seconds;
}

export function resetTimerSeconds() {
  countdownSeconds = DEFAULT_COUNTDOWN_SECONDS;
}
