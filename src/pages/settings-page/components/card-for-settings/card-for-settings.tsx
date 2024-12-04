import { Card } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Meta } = Card;

type Props = {
  image: string;
  title: string;
  description: string;
  path: string;
};

export const SettingCard = ({ image, title, description, path }: Props) => {
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate(path)}
      hoverable
      style={{ width: 240 }}
      cover={<img alt="example" src={image} />}>
      <Meta title={title} description={description} />
    </Card>
  );
};
