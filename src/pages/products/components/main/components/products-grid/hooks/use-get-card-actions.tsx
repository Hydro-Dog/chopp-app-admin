import { SettingOutlined, DeleteOutlined, CloseOutlined, RollbackOutlined, EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { useProductsContext } from '@pages/products/context';
import { FETCH_STATUS, Product, PRODUCT_STATE, updateListItemById, useSuperDispatch } from '@shared/index';
import { UpdateProductVisibilityDTO, updateProductVisibility } from '@store/slices';
import { RootState } from '@store/store';
import { Tooltip } from 'antd';
import { Switch } from 'antd/lib';
import { t } from 'i18next';
import { useSelector } from 'react-redux';

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
  
  const {
    setPageProducts,
    productsState,
    search,
    limit,
    page,
    pageProducts,
    setPage,
    setTotalItems,
    setTotalPages,
    setLimit,
  } = useProductsContext();
  const { updateProductVisibilityStatusMap } = useSelector((state: RootState) => state.products);
  const { superDispatch: updateProductDispatch } = useSuperDispatch<
      Product,
      UpdateProductVisibilityDTO
    >();
    
  const onVisibilityToggled = ({ id, state }: UpdateProductVisibilityDTO) => {
      updateProductDispatch({
        action: updateProductVisibility({ id, state }),
        thenHandler: (product) => {
          setPageProducts((prevProducts) => updateListItemById(prevProducts, product));
        },
      });
    };

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

    item.state !== PRODUCT_STATE.MOVED_TO_TRASH && (
      <Tooltip
        key="isVisible"
        title={t(
          item.state === PRODUCT_STATE.DEFAULT
            ? 'PRODUCT_VISIBLE_TOOLTIP'
            : 'PRODUCT_HIDDEN_TOOLTIP',
        )}>
        <Switch
        size='small'
          onChange={(isVisible) =>
            onVisibilityToggled({
              id: item.id,
              state: isVisible ? PRODUCT_STATE.DEFAULT : PRODUCT_STATE.HIDDEN,
            })
          }
          checkedChildren={<EyeOutlined />}
          unCheckedChildren={<EyeInvisibleOutlined />}
          checked={item.state === PRODUCT_STATE.DEFAULT}
          loading={updateProductVisibilityStatusMap[String(item.id)] === FETCH_STATUS.LOADING}
        />
      </Tooltip>
    )
  ];

  return { getActions };
};
