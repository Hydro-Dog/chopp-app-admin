import { useSearchParams } from 'react-router-dom';

export const useSearchParamValue = (key: string) => {
  const [searchParams] = useSearchParams();
  return searchParams.get(key);
};
