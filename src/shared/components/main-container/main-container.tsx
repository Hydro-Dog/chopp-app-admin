import { forwardRef, PropsWithChildren } from 'react';

export const MainContainer = forwardRef<HTMLDivElement, PropsWithChildren<object>>((props, ref) => {
  return (
    <div ref={ref} className="m-3 h-full">
      {props.children}
    </div>
  );
});

MainContainer.displayName = 'MainContainer';
