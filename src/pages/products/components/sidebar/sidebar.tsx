import { useSelector } from 'react-redux';
import { FETCH_STATUS } from '@shared/index';
import { RootState } from '@store/store';
import { useBoolean } from 'usehooks-ts';
import { CreateCategoryModal } from './components';
import { CategoriesList } from './components/categories-list/categories-list';
import { SidebarHeader } from './components/sidebar-header';
import { VerticalLayout } from '../../../../shared/index';
import { TrashButton } from '../main/components/products-layout-main/components';
import { Divider } from 'antd';

export const Sidebar = () => {
  const { updateCategoriesStatus } = useSelector((state: RootState) => state.productCategory);

  const {
    value: isCreateCategoryModalOpen,
    setTrue: openCreateCategoryModal,
    setFalse: closeCreateCategoryModal,
  } = useBoolean();

  return (
    <>
      <VerticalLayout
        header={
          <SidebarHeader
            onOpenCreateCategory={openCreateCategoryModal}
            isLoading={updateCategoriesStatus === FETCH_STATUS.LOADING}
          />
        }
        main={
          <>
            <CategoriesList />
          </>
        }
        footer={
          <>
            <Divider className="ant-divider-horizontal my-2" />
            <div className="flex justify-center">
              <TrashButton />
            </div>
          </>
        }
      />
      <CreateCategoryModal open={isCreateCategoryModalOpen} onClose={closeCreateCategoryModal} />
    </>
  );
};
