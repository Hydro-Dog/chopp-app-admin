import { useTranslation } from 'react-i18next';
import { AppstoreOutlined, PlusOutlined } from '@ant-design/icons';
import { Typography, Flex, Tooltip, Button } from 'antd';

const { Title } = Typography;

type Props = {
  onOpenCreateCategory: () => void;
  isLoading: boolean;
};

export const SidebarHeader = ({ onOpenCreateCategory, isLoading }: Props) => {
  const { t } = useTranslation();

  return (
    <Flex align="center" justify="space-between" className="mr-2 mt-1">
      <Flex align="center" gap={10}>
        <AppstoreOutlined className="text-xl" />
        <Title className="!m-0 whitespace-nowrap" level={4}>
          {t('CATEGORIES')}
        </Title>
      </Flex>
      <Tooltip title={t('ADD_CATEGORY')}>
        <Button
          disabled={isLoading}
          loading={isLoading}
          onClick={onOpenCreateCategory}
          type="primary">
          <PlusOutlined className="text-xl" />
        </Button>
      </Tooltip>
    </Flex>
  );
};
