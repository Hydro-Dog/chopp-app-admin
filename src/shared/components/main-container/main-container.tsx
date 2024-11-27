import { forwardRef, PropsWithChildren } from 'react';

export const MainContainer = forwardRef<HTMLDivElement, PropsWithChildren<object>>((props, ref) => {
  return (
    <div ref={ref} className="mx-6 my-4 h-full">
      {props.children}
    </div>
  );
});

MainContainer.displayName = 'MainContainer';
