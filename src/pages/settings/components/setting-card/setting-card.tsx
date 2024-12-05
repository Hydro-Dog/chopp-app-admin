import { useNavigate } from 'react-router-dom';
import { Card } from 'antd';

const { Meta } = Card;

type Props = {
  image: React.ReactNode;
  title: string;
  description: string;
  path: string;
};

export const SettingCard = ({ image, title, description, path }: Props) => {
  const navigate = useNavigate();

  return (
    <Card onClick={() => navigate(path)} hoverable style={{ width: 240 }} cover={image}>
      <Meta title={title} description={description} />
    </Card>
  );
};
