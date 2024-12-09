import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SIGN_IN_TYPE } from '../sign-in-page.types';

export const useSignInTabs = () => {
    const { t } = useTranslation();

    const [signInType, setSignInType] = useState(SIGN_IN_TYPE.EMAIL);
    const isSignInByEmail = signInType === SIGN_IN_TYPE.EMAIL

    const tabsItems = [
        {
          key: SIGN_IN_TYPE.EMAIL,
          label: t('BY_EMAIL'),
        },
        {
          key: SIGN_IN_TYPE.PHONE_NUMBER,
          label: t('PHONE_NUMBER'),
        },
      ];

    return {
        signInType,
        setSignInType,
        isSignInByEmail,
        tabsItems,
    }
}