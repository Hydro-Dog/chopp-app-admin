import { PropsWithChildren } from 'react';
import { Tag } from 'antd';
import { TagProps } from 'antd/lib';

export const ChoppTag = ({ children, ...props }: PropsWithChildren<TagProps>) => {
  return (
    <Tag  {...props} bordered={false} className="cursor-pointer">
      {children}
    </Tag>
  );
};
