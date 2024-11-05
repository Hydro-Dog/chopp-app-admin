import { PropsWithChildren } from 'react';
import { Typography } from 'antd';
import { MainContainer } from '../main-container';

const { Title } = Typography;

type Props = {
  title: string;
};

export const TitlePage = ({ title, children }: PropsWithChildren<Props>) => {
  return (
    <div className="h-full">
      <MainContainer>
        <Title level={2}>{title}</Title>
        {children}
      </MainContainer>
    </div>
  );
};
