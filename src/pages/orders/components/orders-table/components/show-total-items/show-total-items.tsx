import { useTranslation } from 'react-i18next';

export const ShowTotalItems = (totalItems: number) => {
  const { t } = useTranslation();
  return (
    <div>
      {t('totalItems')}
      {totalItems}
    </div>
  );
};
