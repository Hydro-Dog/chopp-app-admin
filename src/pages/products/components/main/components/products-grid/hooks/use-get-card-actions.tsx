import { SettingOutlined, DeleteOutlined, CloseOutlined, RollbackOutlined } from '@ant-design/icons';
import { useProductsContext } from '@pages/products/context';
import { Product, PRODUCT_STATE } from '@shared/index';
import { Tooltip } from 'antd';
import { t } from 'i18next';

type Args = {
  onSettingClicked: (item: Product) => void;
  onMoveToTrashClicked: (item: Product) => void;
  onDeleteClicked: (item: Product) => void;
  onRevertTrashClicked: (item: Product) => void;
};

export const useGetCardActions = ({
  onSettingClicked,
  onMoveToTrashClicked,
  onDeleteClicked,
  onRevertTrashClicked,
}: Args) => {
  const { productsState } = useProductsContext();

  const getActions = (item: Product) => [
    productsState === PRODUCT_STATE.MOVED_TO_TRASH ? (
      <Tooltip key="revertMoveToTrash" title={t('REVERT_MOVE_TO_TRASH')}>
        <RollbackOutlined onClick={() => onRevertTrashClicked(item)}/>
      </Tooltip>
    ) : (
      <Tooltip key="edit" title={t('EDIT')}>
        <SettingOutlined onClick={() => onSettingClicked(item)} />
      </Tooltip>
    ),

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
