import { PropsWithChildren } from 'react';

export const MainContainer = ({ children }: PropsWithChildren) => {
  return <div className="mx-6 my-4 h-full">{children}</div>;
};
