import { Card } from 'antd';

const { Meta } = Card;

type Props = {
  image: string;
  title: string;
  description: string;
  path: string;
};

export const SettingCard = ({ image, title, description, path }: Props) => (
  <a href={path}>
    <Card
      className="m-5"
      hoverable
      style={{ width: 240 }}
      cover={<img alt="example" src={image} />}>
      <Meta title={title} description={description} />
    </Card>
  </a>
);
