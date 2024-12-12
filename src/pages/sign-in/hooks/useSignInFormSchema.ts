import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import { SIGN_IN_TYPE, ZodShapeType } from '../sign-in-page.types';

export const useSignInFormSchema = (tab: SIGN_IN_TYPE) => {
  const { t } = useTranslation();

  const password = z
    .string()
    .min(8, { message: t('ERRORS.PASSWORD_TOO_SHORT', { length: '8 символов' }) })
    .max(160, { message: t('ERRORS.PASSWORD_TOO_LONG') });

  const zodShape: ZodShapeType = { password };

  if (tab === SIGN_IN_TYPE.EMAIL) {
    zodShape.email = z.string().min(1, { message: t('ERRORS.REQUIRED') });
  } else {
    zodShape.phoneNumber = z.string().min(1, { message: t('ERRORS.REQUIRED') });
  }

  return z.object(zodShape);
};
