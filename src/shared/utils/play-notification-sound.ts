// src/shared/utils/playNotificationSound.ts

import errorSound from 'src/assets/sounds/error-notification.mp3';
import infoSound from 'src/assets/sounds/info-notification.mp3';
import successSound from 'src/assets/sounds/success-notification.mp3';
import warningSound from 'src/assets/sounds/warn-notification.mp3';

const soundMap: Record<string, string> = {
  error: errorSound,
  info: infoSound,
  success: successSound,
  warning: warningSound,
};

/**
 * Воспроизводит звук по типу нотификации
 * @param {string} type — 'error', 'info', 'success', 'warning'
 */
export function playNotificationSound(type = 'info') {
  try {
    const src = soundMap[type] || soundMap['info'];
    const audio = new Audio(src);
    audio.volume = 0.6;
    audio.play();
  } catch (e) {
    console.warn('Failed to play notification sound', e);
  }
}
