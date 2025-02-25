import { SettingOutlined, DeleteOutlined, CloseOutlined } from '@ant-design/icons';
import { useProductsContext } from '@pages/products/context';
import { Product, PRODUCT_STATE } from '@shared/index';
import { Tooltip } from 'antd';
import { t } from 'i18next';

type Args = {
  onSettingClicked: (item: Product) => void;
  onMoveToTrashClicked: (item: Product) => void;
  onDeleteClicked: (item: Product) => void;
};

export const useGetCardActions = ({
  onSettingClicked,
  onMoveToTrashClicked,
  onDeleteClicked,
}: Args) => {
  const { productsState } = useProductsContext();

  const getActions = (item: Product) => [
    <Tooltip key="edit" title={t('EDIT')}>
      <SettingOutlined onClick={() => onSettingClicked(item)} />
    </Tooltip>,
    productsState === PRODUCT_STATE.MOVED_TO_TRASH ? (
      <Tooltip key="delete" title={t('DELETE_PRODUCT')}>
        <CloseOutlined onClick={() => onDeleteClicked(item)} />
      </Tooltip>
    ) : (
      <Tooltip key="trash" title={t('MOVE_TO_TRASH')}>
        <DeleteOutlined onClick={() => onMoveToTrashClicked(item)} />
      </Tooltip>
    ),
  ];

  return { getActions };
};
