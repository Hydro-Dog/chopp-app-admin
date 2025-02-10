import { PropsWithChildren, useEffect, useRef } from 'react';
import { ChoppBreadcrumbs } from '@shared/index';
import { Typography } from 'antd';
import { MainContainer } from '../main-container';

const { Title } = Typography;

type Props = {
  title: string;
  breadcrumbs?: boolean;
};

export const TitlePage = ({ title, breadcrumbs = true, children }: PropsWithChildren<Props>) => {
  const titleRef = useRef<HTMLElement>(null);
  const mainContainerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Проверяем, существуют ли элементы, на которые указывают ссылки
    if (titleRef.current && mainContainerRef.current && contentRef.current) {
      const titleHeight = titleRef.current.offsetHeight; // Получаем высоту заголовка
      const titleStyle = getComputedStyle(titleRef.current); // Получаем стили контейнера
      const marginBottomTitle = parseInt(titleStyle.marginBottom, 10); // Получаем верхний маржин контейнера
      const containerStyle = getComputedStyle(mainContainerRef.current); // Получаем стили контейнера
      const marginTopContainer = parseInt(containerStyle.marginTop, 10); // Получаем верхний маржин контейнера
      const marginBottomContainer = parseInt(containerStyle.marginBottom, 10); // Получаем верхний маржин контейнера

      const viewportHeight = window.innerHeight; // Получаем высоту видимой области окна
      const contentHeight =
        viewportHeight -
        titleHeight -
        marginTopContainer -
        marginBottomContainer -
        marginBottomTitle; // Вычисляем нужную высоту для contentRef

      contentRef.current.style.height = `${contentHeight}px`; // Устанавливаем высоту contentRef
    }
  }, []); // Пустой массив зависимостей означает, что эффект выполнится один раз после монтирования компонента

  return (
    <div className="h-full">
      <MainContainer ref={mainContainerRef}>
        <Title ref={titleRef} level={2} className="!mb-1">
          {title}
        </Title>
        {breadcrumbs && <ChoppBreadcrumbs />}
        <div ref={contentRef} style={{ overflow: 'auto' }}>
          {children}
        </div>
      </MainContainer>
    </div>
  );
};
