import { ReactNode, useRef } from 'react';

type Props = {
  titleNode: ReactNode;
  mainNode: ReactNode;
};

export const VerticalGrid = ({ titleNode, mainNode }: Props) => {
  const flexRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div ref={flexRef}>{titleNode}</div>
      <div
        style={{
          overflow: 'scroll',
          // 24px - это два паддинга card-body размера small
          height: `calc(100% - 24px - ${flexRef.current?.offsetHeight || 0}px)`,
          marginTop: '12px',
          marginRight: '12px',
        }}>
        {mainNode}
      </div>
    </>
  );
};
