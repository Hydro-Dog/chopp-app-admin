import React from 'react';
import { SvgIconProps } from '@mui/material';
import { useThemeToken } from '@shared/index';

type Props = {
  IconComponent: React.ComponentType<SvgIconProps>; // Используем ComponentType для компонентов React
  isActive?: boolean;
};

export const SettingsGridIcon = ({ IconComponent, isActive }: Props) => {
  const themeToken = useThemeToken();

  return (
    <IconComponent
      style={{
        fontSize: '120px',
        color: isActive ? themeToken.colorPrimaryBorder : themeToken.colorPrimaryBgHover,
      }}
    />
  );
};
