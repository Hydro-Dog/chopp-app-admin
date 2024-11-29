import { ConfirmModal } from '@shared/components';
import { Category } from '@store/slices/goods-slice';
import { Alert, Flex, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

const { Text, Link } = Typography;

type Props = {
  category?: Category;
  open: boolean;
  onCancel: () => void;
  onOk: () => void;
};

export const DeleteCategoryModal = ({ category, open, onCancel, onOk }: Props) => {
  const { t } = useTranslation();
  return (
    <ConfirmModal
      title={t('DELETE_CATEGORY')}
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      okTitle={t('DELETE')}
      okColor="danger">
      <Flex vertical gap={8}>
        <Flex gap={4}>
          <Text>Высобираетесь удалить категорию</Text>
          <Text strong>{category?.title}</Text>
        </Flex>

        <Alert
          message={
            <>
              <Text>Все товары из нее будут перенесены в категорию </Text>
              <Text strong>Без категории</Text>
            </>
          }
          type="error"
        />
      </Flex>
    </ConfirmModal>
  );
};
