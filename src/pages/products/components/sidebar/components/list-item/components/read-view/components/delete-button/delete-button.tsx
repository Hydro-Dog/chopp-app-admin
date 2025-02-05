import { useTranslation } from 'react-i18next';
import { DeleteOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';

type Props = {
  onDeleteItem: () => void;
};

export const DeleteButton = ({ onDeleteItem }: Props) => {
  const { t } = useTranslation();

  return (
    <Tooltip title={t('DELETE_CATEGORY')}>
      <Button
        shape="circle"
        color="danger"
        variant="filled"
        onClick={(e) => {
          e.stopPropagation();
          onDeleteItem();
        }}>
        <DeleteOutlined className="text-xl" />
      </Button>
    </Tooltip>
  );
};
