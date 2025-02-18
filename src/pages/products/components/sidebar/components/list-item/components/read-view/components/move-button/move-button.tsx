import { useTranslation } from 'react-i18next';
import { ColumnHeightOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';

export const MoveButton = () => {
  const { t } = useTranslation();

  return (
    <Tooltip title={t('DRAG_CATEGORY_TOOLTIP_TEXT')}>
      <Button
        shape="circle"
        variant="filled"
        type="text"
        onClick={(e) => {
          e.stopPropagation();
        }}>
        <ColumnHeightOutlined className="text-xl" />
      </Button>
    </Tooltip>
  );
};
