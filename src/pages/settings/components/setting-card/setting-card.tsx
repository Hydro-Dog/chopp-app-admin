import { useNavigate } from 'react-router-dom';
import { Card, Typography } from 'antd';
const { Paragraph } = Typography;
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
    <Card onClick={() => navigate(path)} hoverable className="!w-56 !h-64" cover={image}>
      <Meta
        title={title}
        description={
          <Paragraph ellipsis={{ rows: 3, tooltip: description }}>{description}</Paragraph>
        }
      />
    </Card>
  );
};
