import { useTranslation } from 'react-i18next';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import { SETTINGS_PATHS } from '@shared/index';

export const useGetSettings = () => {
  const { t } = useTranslation();
  return [
    {
      path: SETTINGS_PATHS.VISUAL_SETTINGS,
      image: <ColorLensIcon style={{ fontSize: '120px' }} />,
      title: t('SETTINGS_PAGE.VISUAL_SETTINGS.THEMES'),
      description: t('SETTINGS_PAGE.VISUAL_SETTINGS.CHOOSING A THEME ON THE SITE'),
    },
    {
      path: SETTINGS_PATHS.PRICING_SETTINGS,
      image: <ColorLensIcon style={{ fontSize: '120px' }} />,
      title: t('PRICING'),
      description: t('PRICING'),
    },
  ];
};
