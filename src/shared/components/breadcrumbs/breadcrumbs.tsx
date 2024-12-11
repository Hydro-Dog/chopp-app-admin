import { useLocation, useNavigate } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import { ROUTES } from '@shared/enum';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export const Breadcrumbs = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const [pathSegment, setPathSegment] = useState([
    ...new Set(location.pathname.split('/').map((item) => (item === '' ? (item = '/') : item))),
  ]);

  const breadcrumbsNavigation = (item: string) => {
    const index = pathSegment.indexOf(item);
    setPathSegment((prev) => prev.slice(0, index + 1));

    if (pathSegment.length > 1) {
      const URL = pathSegment.slice(0, 1).join('') + pathSegment.slice(1, index + 1).join('/');
      navigate(URL);
    } else {
      const URL = pathSegment.slice(0, 1).join('');
      navigate(URL);
    }
  };

  const namings = Object.entries(ROUTES);

  return (
    <Breadcrumb className="my-5">
      {pathSegment.map((item) => (
        <Breadcrumb.Item
          key={item}
          onClick={() => breadcrumbsNavigation(item)}
          className=" cursor-pointer">
          {t(`PATHS.${namings.find(([_, val]) => val === item)?.[0]}`)}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};
