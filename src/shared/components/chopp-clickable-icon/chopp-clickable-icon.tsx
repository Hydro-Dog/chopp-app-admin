import React from 'react';
import { SvgIconProps } from '@mui/material/SvgIcon';
import { useThemeToken } from '@shared/index';
import { Tooltip } from 'antd';

type Props = {
  Icon: React.ComponentType<SvgIconProps>; // Передаем компонент иконки
  tooltipText?: string;
  fontSize?: SvgIconProps['fontSize'];
  onClick?: () => void;
};

export const ChoppClickableIcon = ({ Icon, tooltipText, fontSize = 'small', onClick }: Props) => {
  const themeToken = useThemeToken();

  return (
    <div onClick={onClick}>
      <Tooltip title={tooltipText}>
        <Icon
          fontSize={fontSize}
          sx={{
            color: themeToken.colorIcon,
            '&:hover': {
              cursor: 'pointer',
              color: themeToken.colorIconHover,
            },
            '&:active': {
              color: themeToken.colorBgSolidHover,
            },
          }}
        />
      </Tooltip>
    </div>
  );
};
