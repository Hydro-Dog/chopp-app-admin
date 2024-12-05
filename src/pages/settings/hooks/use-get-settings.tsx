import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import { SETTINGS_PATHS } from '@shared/index';
import { SettingsGridIcon } from '../components/settings-grid-icon';

export const useGetSettings = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const isActive = (value: string) => pathname.includes(value);

  return [
    {
      path: SETTINGS_PATHS.VISUAL_SETTINGS,
      image: <SettingsGridIcon IconComponent={ColorLensIcon} />,
      title: t('SETTINGS_PAGE.VISUAL_SETTINGS.THEMES'),
      description: t('SETTINGS_PAGE.VISUAL_SETTINGS.CHOOSING_A_THEME_ON_THE_SITE'),
    },
    {
      path: SETTINGS_PATHS.PRICING_SETTINGS,
      image: <SettingsGridIcon IconComponent={ColorLensIcon} />,
      title: t('PRICING'),
      description: t('PRICING'),
    },
  ];
};
