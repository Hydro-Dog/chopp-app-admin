import { ReactNode, useRef } from 'react';

type Props = {
  header: ReactNode;
  main: ReactNode;
};

export const VerticalLayout = ({ header, main }: Props) => {
  const flexRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div ref={flexRef}>{header}</div>
      <div
        style={{
          overflow: 'scroll',
          // 24px - это два паддинга card-body размера small
          height: `calc(100% - 24px - ${flexRef.current?.offsetHeight || 0}px)`,
          marginTop: '12px',
          marginRight: '12px',
        }}>
        {main}
      </div>
    </>
  );
};
