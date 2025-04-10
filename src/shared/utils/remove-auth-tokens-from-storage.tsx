import { STORAGE_KEYS } from '@shared/enum';

export const removeAuthTokensFromStorage = () => {
  localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
};
