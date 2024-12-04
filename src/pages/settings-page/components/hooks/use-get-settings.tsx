import { useTranslation } from 'react-i18next';
import { SETTINGS_PATHS } from '@shared/index';

export const useGetSettings = () => {
  const { t } = useTranslation();
  return [
    {
      path: SETTINGS_PATHS.VISUAL_SETTINGS,
      image: 'https://cdn.icon-icons.com/icons2/272/PNG/512/Settings_30027.png',
      title: t('SETTINGS_PAGE.VISUAL_SETTINGS.Themes'),
      description: t('SETTINGS_PAGE.VISUAL_SETTINGS.Choosing a theme on the site'),
    },
    {
      path: SETTINGS_PATHS.VISUAL_SETTINGS,
      image: 'https://cdn.icon-icons.com/icons2/272/PNG/512/Settings_30027.png',
      title: t('SETTINGS_PAGE.VISUAL_SETTINGS.Themes'),
      description: t('SETTINGS_PAGE.VISUAL_SETTINGS.Choosing a theme on the site'),
    },
    {
      path: SETTINGS_PATHS.VISUAL_SETTINGS,
      image: 'https://cdn.icon-icons.com/icons2/272/PNG/512/Settings_30027.png',
      title: t('SETTINGS_PAGE.VISUAL_SETTINGS.Themes'),
      description: t('SETTINGS_PAGE.VISUAL_SETTINGS.Choosing a theme on the site'),
    },
    {
      path: SETTINGS_PATHS.VISUAL_SETTINGS,
      image: 'https://cdn.icon-icons.com/icons2/272/PNG/512/Settings_30027.png',
      title: t('SETTINGS_PAGE.VISUAL_SETTINGS.Themes'),
      description: t('SETTINGS_PAGE.VISUAL_SETTINGS.Choosing a theme on the site'),
    },
    {
      path: SETTINGS_PATHS.VISUAL_SETTINGS,
      image: 'https://cdn.icon-icons.com/icons2/272/PNG/512/Settings_30027.png',
      title: t('SETTINGS_PAGE.VISUAL_SETTINGS.Themes'),
      description: t('SETTINGS_PAGE.VISUAL_SETTINGS.Choosing a theme on the site'),
    },
    {
      path: SETTINGS_PATHS.VISUAL_SETTINGS,
      image: 'https://cdn.icon-icons.com/icons2/272/PNG/512/Settings_30027.png',
      title: t('SETTINGS_PAGE.VISUAL_SETTINGS.Themes'),
      description: t('SETTINGS_PAGE.VISUAL_SETTINGS.Choosing a theme on the site'),
    },
    {
      path: SETTINGS_PATHS.VISUAL_SETTINGS,
      image: 'https://cdn.icon-icons.com/icons2/272/PNG/512/Settings_30027.png',
      title: t('SETTINGS_PAGE.VISUAL_SETTINGS.Themes'),
      description: t('SETTINGS_PAGE.VISUAL_SETTINGS.Choosing a theme on the site'),
    },
  ];
};
