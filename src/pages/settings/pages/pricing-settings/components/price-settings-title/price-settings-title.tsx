import { useTranslation } from 'react-i18next';
import { Button, Flex, Space, Typography } from 'antd';

const { Title } = Typography;

type Props = {
  isEditing: boolean;
  toggleEditMode: () => void;
};

export const PriceSettingsTitle = ({ isEditing, toggleEditMode }: Props) => {
  const { t } = useTranslation();
  console.log('isEditing:', isEditing);
  return (
    <Flex className="w-full" justify="space-between" align="center">
      <Title className="!m-0" level={4}>
        {t('DELIVERY')}
      </Title>
      <div>
        {isEditing ? (
          <Space>
            <Button onClick={toggleEditMode}>{t('CANCEL')}</Button>
          </Space>
        ) : (
          <Button type="primary" onClick={toggleEditMode}>
            {t('EDIT')}
          </Button>
        )}
      </div>
    </Flex>
  );
};
