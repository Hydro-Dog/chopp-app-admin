import { useSelector } from 'react-redux';
import { FETCH_STATUS } from '@shared/index';
import { RootState } from '@store/store';
import { useBoolean } from 'usehooks-ts';
import { CreateCategoryModal } from './components';
import { VerticalLayout } from '../vertical-layout';
import { CategoriesList } from './components/categories-list/categories-list';
import { SidebarHeader } from './components/sidebar-header';

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
        main={<CategoriesList />}
      />
      <CreateCategoryModal open={isCreateCategoryModalOpen} onClose={closeCreateCategoryModal} />
    </>
  );
};
