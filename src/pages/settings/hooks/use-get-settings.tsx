import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { ClockCircleOutlined, FormatPainterOutlined, TagsOutlined } from '@ant-design/icons';
import { ROUTES } from '@shared/index';
import { SettingsGridIcon } from '../components/settings-grid-icon';

export const useGetSettings = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const isActive = (value: string) => pathname.includes(value);

  return [
    {
      path: ROUTES.VISUAL_SETTINGS,
      image: <SettingsGridIcon IconComponent={FormatPainterOutlined} />,
      title: t('SETTINGS_PAGE.VISUAL_SETTINGS.THEME'),
      description: t('SETTINGS_PAGE.VISUAL_SETTINGS.CHOOSING_THEME_ON_SITE'),
    },
    {
      path: ROUTES.PRICING_SETTINGS,
      image: <SettingsGridIcon IconComponent={TagsOutlined} />,
      title: t('PRICING'),
      description: t('PRICING'),
    },
    // {
    //   path: ROUTES.PAYMENT_SETTINGS,
    //   image: <SettingsGridIcon IconComponent={ColorLensIcon} />,
    //   title: t('PAYMENT_SETTINGS'),
    //   description: t('PAYMENT_SETTINGS_DATA'),
    // },
    {
      path: ROUTES.TIME_SETTINGS,
      image: <SettingsGridIcon IconComponent={ClockCircleOutlined} />,
      title: t('SETTINGS_PAGE.TIME_SETTINGS.TIME_SETTINGS_TITLE'),
      description: t('SETTINGS_PAGE.TIME_SETTINGS.TIME_SETTINGS_DATA'),
    },
  ];
};
