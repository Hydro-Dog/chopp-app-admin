import { useTranslation } from 'react-i18next';
import { ClockCircleOutlined, FormatPainterOutlined, TagsOutlined } from '@ant-design/icons';
import { ROUTES } from '@shared/index';
import { SettingsGridIcon } from '../components/settings-grid-icon';

export const useGetSettings = () => {
  const { t } = useTranslation();

  return [
    // {
    //   path: ROUTES.VISUAL_SETTINGS,
    //   image: <SettingsGridIcon IconComponent={FormatPainterOutlined} />,
    //   title: t('SETTINGS_PAGE.VISUAL_SETTINGS.THEME'),
    //   description: t('SETTINGS_PAGE.VISUAL_SETTINGS.CHOOSING_THEME_ON_SITE'),
    // },
    {
      path: ROUTES.PRICING_SETTINGS,
      image: <SettingsGridIcon IconComponent={TagsOutlined} />,
      title: t('PRICING'),
      description: t('PRICING'),
    },
    {
      path: ROUTES.TIME_SETTINGS,
      image: <SettingsGridIcon IconComponent={ClockCircleOutlined} />,
      title: t('SETTINGS_PAGE.TIME_SETTINGS.TITLE'),
      description: t('SETTINGS_PAGE.TIME_SETTINGS.DATA'),
    },
  ];
};
