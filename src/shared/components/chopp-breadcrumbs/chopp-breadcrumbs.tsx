import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { ROUTES } from '@shared/enum';
import { Breadcrumb } from 'antd';

const { Item } = Breadcrumb;

const ROUTES_MAP = Object.entries(ROUTES);

export const ChoppBreadcrumbs = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const path = location.pathname.split('/').filter(Boolean);

  if (path.length <= 1) {
    return <></>;
  }

  return (
    <Breadcrumb className="my-5">
      {path.map((item, index) => (
        <Item key={item} className="cursor-pointer">
          <a href={`/${path.slice(0, index + 1).join('/')}`}>
            {t(`${ROUTES_MAP.find(([_, val]) => val === item)?.[0]}`)}
          </a>
        </Item>
      ))}
    </Breadcrumb>
  );
};
