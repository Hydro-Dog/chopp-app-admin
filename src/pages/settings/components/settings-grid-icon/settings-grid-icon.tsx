import React from 'react';
import { AntdIconProps } from '@ant-design/icons/lib/components/AntdIcon';
import { useThemeToken } from '@shared/index';

type Props = {
  IconComponent: React.ComponentType<AntdIconProps>; // Используем ComponentType для компонентов React
  isActive?: boolean;
};

export const SettingsGridIcon = ({ IconComponent, isActive }: Props) => {
  const themeToken = useThemeToken();

  return (
    <IconComponent
      style={{
        fontSize: '100px',
        paddingTop: '20px',
        color: isActive ? themeToken.colorPrimaryBorder : themeToken.colorPrimaryBgHover,
      }}
    />
  );
};
