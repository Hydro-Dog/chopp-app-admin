import React, { ReactNode, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import HeightRoundedIcon from '@mui/icons-material/HeightRounded';
import { ChoppClickableIcon } from '@shared/components/chopp-clickable-icon';
import { Flex, List } from 'antd';

interface Props<T> {
  id: string;
  index: number;
  title: T;
  order: number;
  active?: string;
  onDeleteItem?: (id: string) => void;
  onClick?: (id: string) => void;
}

export const ListItem = <T extends ReactNode>({
  id,
  title,
  order,
  active,
  onDeleteItem,
  onClick,
}: Props<T>) => {
  console.log('active: ', active);
  const [hovered, setHovered] = useState(false);
  const { t } = useTranslation();
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  return (
    <Flex
      justify="space-between"
      align="center"
      gap={8}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => {
        onClick(id)
      }}>
      <List.Item
        className="w-full"
        ref={setNodeRef}
        style={{ backgroundColor: active === id ? 'lightblue' : 'transparent' }}
        {...attributes}
        {...listeners}>
        {hovered && (
          <ChoppClickableIcon
            Icon={HeightRoundedIcon}
            tooltipText={t('DRAG_CATEGORY_TOOLTIP_TEXT')}
          />
        )}
      </List.Item>

      <div className="ml-2">
        {order + 1}. {title}
      </div>

      {onDeleteItem && hovered && (
        <ChoppClickableIcon
          Icon={ClearRoundedIcon}
          tooltipText={t('DELETE_CATEGORY')}
          onClick={() => onDeleteItem(id)}
        />
      )}
    </Flex>
  );
};
