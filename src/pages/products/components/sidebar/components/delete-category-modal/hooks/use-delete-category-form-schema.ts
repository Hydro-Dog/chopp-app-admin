import { useTranslation } from 'react-i18next';
import { z } from 'zod';

type Args = {
  categoryTitle?: string;
};

export const useDeleteCategoryFormSchema = ({ categoryTitle }: Args) => {
  const { t } = useTranslation();

  return z.object({
    name: z
      .string()
      .min(1, { message: t('ERRORS.REQUIRED') })
      .refine((value) => categoryTitle === value, {
        message: t('ERRORS.CATEGORY_NAME_NOT_THE_SAME', { categoryTitle }),
      }),
  });
};
