import { z } from 'zod';

export const useCreatePricingFormSchema = () => {
  return z.object({
    averageDeliveryCost: z.number().min(1, { message: 'error1' }),
    freeDeliveryIncluded: z.boolean(),
    freeDeliveryThreshold: z.number().min(1),
  });
};
