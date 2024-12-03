import { useTranslation } from 'react-i18next';
import { TitlePage } from '@shared/components';
import { Row } from 'antd';
import { SettingCard } from './card-for-settings';

//---------------Пример настроек для просмотра разметки-------------------------------------
const data = [
  {
    id: 123,
    image: 'https://cdn.icon-icons.com/icons2/272/PNG/512/Settings_30027.png',
    title: 'Settings',
    description: 'Let settings',
  },
  {
    id: 124,
    image: 'https://cdn.icon-icons.com/icons2/272/PNG/512/Settings_30027.png',
    title: 'Settings',
    description: 'Let settings',
  },
  {
    id: 125,
    image: 'https://cdn.icon-icons.com/icons2/272/PNG/512/Settings_30027.png',
    title: 'Settings',
    description: 'Let settings',
  },
  {
    id: 126,
    image: 'https://cdn.icon-icons.com/icons2/272/PNG/512/Settings_30027.png',
    title: 'Settings',
    description: 'Let settings',
  },
  {
    id: 127,
    image: 'https://cdn.icon-icons.com/icons2/272/PNG/512/Settings_30027.png',
    title: 'Settings',
    description: 'Let settings',
  },
  {
    id: 128,
    image: 'https://cdn.icon-icons.com/icons2/272/PNG/512/Settings_30027.png',
    title: 'Settings',
    description: 'Let settings',
  },
];
//---------------------------------------------------------------------------------

export const SettingsPage = () => {
  const { t } = useTranslation();
  return (
    <TitlePage title={t('SETTINGS')}>
      <Row>
        {data.map((elem) => (
          <SettingCard
            key={elem.id}
            title={elem.title}
            image={elem.image}
            description={elem.description}
          />
        ))}
      </Row>
    </TitlePage>
  );
};
