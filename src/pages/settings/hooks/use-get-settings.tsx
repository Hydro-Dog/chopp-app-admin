import { useTranslation } from 'react-i18next';
import { ClockCircleOutlined, ClockCircleTwoTone, EditTwoTone, FormatPainterOutlined, TagsOutlined, TagTwoTone } from '@ant-design/icons';
import { ROUTES } from '@shared/index';
import { SettingsGridIcon } from '../components/settings-grid-icon';
import { Tooltip } from 'antd';

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
      path: ROUTES.BASIC_INFO_SETTINGS,
      image: <SettingsGridIcon IconComponent={EditTwoTone} />,
      title: (
        <Tooltip title={t('SETTINGS_PAGE.BASIC_INFO_SETTINGS.TITLE')}>
          {t('SETTINGS_PAGE.BASIC_INFO_SETTINGS.TITLE')}
        </Tooltip>
      ),
      description: t('SETTINGS_PAGE.BASIC_INFO_SETTINGS.DATA'),
    },
    {
      path: ROUTES.PRICING_SETTINGS,
      image: <SettingsGridIcon IconComponent={TagTwoTone} />,
      title: <Tooltip title={t('PRICING')}>{t('PRICING')}</Tooltip>,
      description: t('PRICING'),
    },
    {
      path: ROUTES.TIME_SETTINGS,
      image: <SettingsGridIcon IconComponent={ClockCircleTwoTone} />,
      title: (
        <Tooltip title={t('SETTINGS_PAGE.TIME_SETTINGS.TITLE')}>
          {t('SETTINGS_PAGE.TIME_SETTINGS.TITLE')}
        </Tooltip>
      ),
      description: t('SETTINGS_PAGE.TIME_SETTINGS.DATA'),
    },
  ];
};
