import { ReactNode } from 'react';

/**
 * Компонент-лейаут, который занимает 100% высоты контейнера.
 * Верхняя часть — header с фиксированной высотой.
 * Нижняя часть — скроллируемый main, автоматически занимает всё оставшееся пространство.
 * Высота считается через flex, без ручного измерения.
 */

type Props = {
  header: ReactNode;
  main: ReactNode;
  footer?: ReactNode;
};

export const VerticalLayout = ({ header, main, footer }: Props) => {
  return (
    <div className="flex flex-col h-full">
      <div className="shrink-0">{header}</div>
      <div className="grow overflow-scroll overflow-x-hidden">{main}</div>
      <div className="shrink-0">{footer}</div>
    </div>
  );
};
