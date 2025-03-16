import { z } from 'zod';

export const useSetWorkingHoursSchema = () => {
  const timeString = z.string();

  return z.object({
    timeRange: z.tuple([timeString, timeString]).nullish(),
  });
};
