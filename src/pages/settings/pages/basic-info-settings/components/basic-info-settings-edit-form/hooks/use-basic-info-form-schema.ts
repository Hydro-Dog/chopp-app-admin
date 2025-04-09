import { useTranslation } from 'react-i18next';
import { z } from 'zod';

export const useCreateBasicInfoFormSchema = () => {
  const { t } = useTranslation();

  return z.object({
    publicOfferVerbose: z
      .string()
      .min(1, { message: t('ERRORS.REQUIRED') })
      .nullish(),
    description: z
      .string()
      .min(1, { message: t('ERRORS.REQUIRED') })
      .nullish(),
  });
};
