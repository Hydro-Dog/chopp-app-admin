import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { EditOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import { LIST_ITEM_MODE } from '../../../../enum';

type Props = {
  setMode: Dispatch<SetStateAction<LIST_ITEM_MODE>>;
};

export const EditButton = ({ setMode }: Props) => {
  const { t } = useTranslation();

  return (
    <Tooltip title={t('EDIT_TITLE')}>
      <Button
        shape="circle"
        variant="filled"
        type="text"
        onClick={(e) => {
          e.stopPropagation();
          setMode(LIST_ITEM_MODE.EDIT);
        }}>
        <EditOutlined className="text-xl" />
      </Button>
    </Tooltip>
  );
};
