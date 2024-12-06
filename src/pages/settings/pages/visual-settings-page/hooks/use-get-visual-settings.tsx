import { useTranslation } from 'react-i18next';
type Props = {
  theme: string;
};

export const useGetVisualSettings = ({ theme }: Props) => {
  const { t } = useTranslation();
  return {
    title: t('SETTINGS_PAGE.VISUAL_SETTINGS.COLOR_SETTINGS'),
    clue: t('SETTINGS_PAGE.VISUAL_SETTINGS.THEME_CHOOSE'),
    dark: t('SETTINGS_PAGE.VISUAL_SETTINGS.DARK'),
    light: t('SETTINGS_PAGE.VISUAL_SETTINGS.LIGHT'),
    system: t('SETTINGS_PAGE.VISUAL_SETTINGS.SYSTEM'),
    defaultValue: t(`SETTINGS_PAGE.VISUAL_SETTINGS.${theme}`),
  };
};
