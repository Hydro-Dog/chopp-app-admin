import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ROUTES } from '@shared/enum';

export const useGetMenuItemByUrl = () => {
  const location = useLocation();
  const [selectedMenuKeys, setSelectedMenuKeys] = useState<ROUTES[]>([]);

  const getFirstPathSegment = (pathname: string): ROUTES => {
    const segments = pathname.split('/').filter(Boolean);
    return (segments.length ? segments[0] : '') as ROUTES;
  };

  useEffect(() => {
    setSelectedMenuKeys([
      getFirstPathSegment(location.pathname),
      // getFirstPathSegment(location.pathname) === ROUTES.USERS
      //   ? ('' as ROUTES)
      //   : getFirstPathSegment(location.pathname),
    ]);
  }, [location.pathname]);

  return { selectedMenuKeys };
};
