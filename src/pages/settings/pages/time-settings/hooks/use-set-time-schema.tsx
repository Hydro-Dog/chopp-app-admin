import { z } from 'zod';

export const useSetTimeSchema = () => {
  const timeString = z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/);

  return z.object({
    timeRange: z.tuple([timeString, timeString]).nullish(),
  });
};
