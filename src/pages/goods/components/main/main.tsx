import { useSearchParam } from '@shared/index';

export const Main = () => {
  const urlCategoryId = useSearchParam('id');

  return <div>urlCategoryId: {urlCategoryId}</div>;
};
