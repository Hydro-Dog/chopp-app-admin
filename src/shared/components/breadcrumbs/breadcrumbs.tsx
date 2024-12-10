import { useLocation, useNavigate } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import { ROUTES } from '@shared/enum';
import { useState, useTransition } from 'react';
import { useTranslation } from 'react-i18next';

export const Breadcrumbs = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const [parts, setParts] = useState([
    ...new Set(location.pathname.split('/').map((item) => (item === '' ? (item = '/') : item))),
  ]);

  const nav = (item: string) => {
    const index = parts.indexOf(item);
    setParts((prev) => prev.slice(0, index + 1));

    if (parts.length > 1) {
      const URL = parts.slice(0, 1).join('') + parts.slice(1, index + 1).join('/');
      navigate(URL);
    } else {
      const URL = parts.slice(0, 1).join('');
      navigate(URL);
    }
  };

  const namings = Object.entries(ROUTES);

  return (
    <Breadcrumb className="my-5">
      {parts.map((item) => (
        <Breadcrumb.Item key={item} onClick={() => nav(item)} className=" cursor-pointer">
          {t(`BREADCRUMB_PATHS.${namings.find(([key, val]) => val === item)?.[0]}`)}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};
