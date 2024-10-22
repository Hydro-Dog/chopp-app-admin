import { CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import { LeftOutlined } from '@ant-design/icons';
import { Button } from 'antd';

type Props = {
  style?: CSSProperties;
  className?: string;
};

export const BackButton = ({ style, className }: Props) => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <Button
      onClick={goBack}
      icon={<LeftOutlined />}
      className={className}
      style={{ width: 'fit-content', ...style }}>
      {/* TODO: перевод */}
      Назад
    </Button>
  );
};
