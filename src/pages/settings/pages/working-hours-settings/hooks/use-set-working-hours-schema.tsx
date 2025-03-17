import { z } from 'zod';

export const useSetWorkingHoursSchema = () => {
  const timeString = z.string();

  return z.object({
    openTime: timeString.nullish(),
    closeTime: timeString.nullish(),
  });
};
