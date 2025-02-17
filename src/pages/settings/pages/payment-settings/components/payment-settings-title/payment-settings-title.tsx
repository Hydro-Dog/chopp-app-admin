import { useTranslation } from 'react-i18next';
import { Flex, Typography } from 'antd';
const { Title } = Typography;

export const PaymentSettingsTitle = () => {
  const { t } = useTranslation();

  return (
    <Flex className="w-full" justify="space-between" align="center">
      <Title className="!m-0" level={4}>
        {t('PAYMENT')}
      </Title>
    </Flex>
  );
};
