import { useTranslation } from 'react-i18next';
import { Button, Flex, Space, Typography } from 'antd';
const { Title } = Typography;

type Props = {
  isEditing: boolean;
  toggleEditMode: () => void;
};
export const PriceSettingsTitle = ({ isEditing, toggleEditMode }: Props) => {
  const { t } = useTranslation();
  const onSave = () => {
    toggleEditMode();
  };

  return (
    <Flex className="w-full" justify="space-between" align="center">
      <Title className="!m-0" level={4}>
        {t('DELIVERY')}
      </Title>
      <div>
        {isEditing ? (
          <Space>
            <Button onClick={toggleEditMode}>{t('CANCEL')}</Button>
            <Button type="primary" onClick={onSave}>
              {t('SAVE')}
            </Button>
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
