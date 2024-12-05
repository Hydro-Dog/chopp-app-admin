import { useTranslation } from 'react-i18next';
import { SETTINGS_PATHS } from '@shared/index';
import ColorLensIcon from '@mui/icons-material/ColorLens';

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
      path: SETTINGS_PATHS.VISUAL_SETTINGS,
      image: <ColorLensIcon style={{ fontSize: '120px' }} />,
      title: t('SETTINGS_PAGE.VISUAL_SETTINGS.THEMES'),
      description: t('SETTINGS_PAGE.VISUAL_SETTINGS.CHOOSING A THEME ON THE SITE'),
    },
    {
      path: SETTINGS_PATHS.VISUAL_SETTINGS,
      image: <ColorLensIcon style={{ fontSize: '120px' }} />,
      title: t('SETTINGS_PAGE.VISUAL_SETTINGS.THEMES'),
      description: t('SETTINGS_PAGE.VISUAL_SETTINGS.CHOOSING A THEME ON THE SITE'),
    },
    {
      path: SETTINGS_PATHS.VISUAL_SETTINGS,
      image: <ColorLensIcon style={{ fontSize: '120px' }} />,
      title: t('SETTINGS_PAGE.VISUAL_SETTINGS.THEMES'),
      description: t('SETTINGS_PAGE.VISUAL_SETTINGS.CHOOSING A THEME ON THE SITE'),
    },
    {
      path: SETTINGS_PATHS.VISUAL_SETTINGS,
      image: <ColorLensIcon style={{ fontSize: '120px' }} />,
      title: t('SETTINGS_PAGE.VISUAL_SETTINGS.THEMES'),
      description: t('SETTINGS_PAGE.VISUAL_SETTINGS.CHOOSING A THEME ON THE SITE'),
    },
    {
      path: SETTINGS_PATHS.VISUAL_SETTINGS,
      image: <ColorLensIcon style={{ fontSize: '120px' }} />,
      title: t('SETTINGS_PAGE.VISUAL_SETTINGS.THEMES'),
      description: t('SETTINGS_PAGE.VISUAL_SETTINGS.CHOOSING A THEME ON THE SITE'),
    },
    {
      path: SETTINGS_PATHS.VISUAL_SETTINGS,
      image: <ColorLensIcon style={{ fontSize: '120px' }} />,
      title: t('SETTINGS_PAGE.VISUAL_SETTINGS.THEMES'),
      description: t('SETTINGS_PAGE.VISUAL_SETTINGS.CHOOSING A THEME ON THE SITE'),
    },
  ];
};
