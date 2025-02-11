import { Button } from 'antd';
import { t } from 'i18next';

type Props = {
  onLoadMore: () => void;
  totalPages: number;
  page: number;
  className?: string;
};

export const ChoppLoadMore = ({ onLoadMore, totalPages, page, className }: Props) => {
  console.log('totalPages: ', page, totalPages)
  return (
    (page || 1) < totalPages && (
      <Button onClick={onLoadMore} className={className}>
        {t('LOAD_MORE')}
      </Button>
    )
  );
};
