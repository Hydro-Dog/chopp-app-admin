import React from 'react';
import { Card } from 'antd';

const { Meta } = Card;

interface ISettingCardProps {
  image: string;
  title: string;
  description: string;
}

export const SettingCard = ({ image, title, description }: ISettingCardProps) => (
  <Card className="m-5" hoverable style={{ width: 240 }} cover={<img alt="example" src={image} />}>
    <Meta title={title} description={description} />
  </Card>
);
