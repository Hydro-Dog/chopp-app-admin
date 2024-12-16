import { ReactNode, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded';
import { RootState } from '@store/store';
import { FETCH_STATUS } from '@store/types';
import { Flex, Tooltip, Button, Typography } from 'antd';
import { useBoolean } from 'usehooks-ts';

const { Title } = Typography;

type Props = {
  titleNode: ReactNode;
  mainNode: ReactNode;
};

export const VerticalSkeleton = ({ titleNode, mainNode }: Props) => {
  const flexRef = useRef<HTMLElement>(null);
  const { t } = useTranslation();

  const { updateCategoriesStatus } = useSelector((state: RootState) => state.productCategory);

  const {
    value: isCreateCategoryModalOpen,
    setTrue: openCreateCategoryModal,
    setFalse: closeCreateCategoryModal,
  } = useBoolean();

  return (
    <>
      <div ref={flexRef}>
        {titleNode}
        {/* <Flex align="center" gap={20}>
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
        </Tooltip> */}
      </div>
      <div
        style={{
          overflow: 'scroll',
          // 24px - это два паддинга card-body размера small
          height: `calc(100% - 24px - ${flexRef.current?.offsetHeight || 0}px)`,
          marginTop: '12px',
          marginRight: '12px',
        }}>
            {mainNode}
        {/* <CategoriesList /> */}
      </div>

      {/* <CreateCategoryModal open={isCreateCategoryModalOpen} onClose={closeCreateCategoryModal} /> */}
    </>
  );
};
