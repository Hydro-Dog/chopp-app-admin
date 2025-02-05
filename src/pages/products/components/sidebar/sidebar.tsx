import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded';
import { FETCH_STATUS } from '@shared/index';
import { RootState } from '@store/store';
import { Flex, Tooltip, Button, Typography } from 'antd';
import { useBoolean } from 'usehooks-ts';
import { CreateCategoryModal } from './components';
import { VerticalGrid } from '../vertical-grid';
import { CategoriesList } from './components/categories-list/categories-list';

const { Title } = Typography;

export const Sidebar = () => {
  const { t } = useTranslation();
  const { updateCategoriesStatus } = useSelector((state: RootState) => state.productCategory);

  const {
    value: isCreateCategoryModalOpen,
    setTrue: openCreateCategoryModal,
    setFalse: closeCreateCategoryModal,
  } = useBoolean();

  return (
    <>
      <VerticalGrid
        titleNode={
          <Flex align="center" justify="space-between" className="mr-2 mt-1">
            <Flex align="center" gap={20}>
              <FormatListBulletedRoundedIcon />
              <Title className="!m-0 whitespace-nowrap" level={4}>
                {t('CATEGORIES')}
              </Title>
            </Flex>
            <Tooltip title={t('ADD_CATEGORY')}>
              <Button
                disabled={updateCategoriesStatus === FETCH_STATUS.LOADING}
                loading={updateCategoriesStatus === FETCH_STATUS.LOADING}
                onClick={openCreateCategoryModal}
                type="primary">
                <AddRoundedIcon />
              </Button>
            </Tooltip>
          </Flex>
        }
        mainNode={<CategoriesList />}
      />
      <CreateCategoryModal open={isCreateCategoryModalOpen} onClose={closeCreateCategoryModal} />
    </>
  );
};
