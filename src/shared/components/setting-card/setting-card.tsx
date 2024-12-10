/* eslint-disable @typescript-eslint/no-explicit-any */
import { JSXElementConstructor, ReactElement } from 'react';
import { Form, Card, Col, Row } from 'antd';

type Props = {
  children: ReactElement<any, string | JSXElementConstructor<any>>;
  cardTitleComponent?: ReactElement<any, string | JSXElementConstructor<any>> | null | string;
};

export const SettingCardComponent = ({ children, cardTitleComponent = null }: Props) => {
  return (
    <Card title={cardTitleComponent}>
      <Form layout="vertical" size="large">
        {children}
      </Form>
    </Card>
  );
};
