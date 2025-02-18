import { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { useThemeToken } from '@shared/hooks';
import { Flex } from 'antd';
import { EditView } from './components';
import { ReadView } from './components/read-view';
import { LIST_ITEM_MODE } from './enum';

type Props = {
  id: string;
  overId?: string;
  index: number;
  title: string;
  order: number;
  activeId?: string;
  changeable: boolean;
  onDeleteItem?: (id: string) => void;
  onClick?: (id: string) => void;
};

export const ListItem = ({ id, overId, title, order, activeId, changeable, onDeleteItem, onClick }: Props) => {
  const themeToken = useThemeToken();
  const [hovered, setHovered] = useState(false);
  const [mode, setMode] = useState<LIST_ITEM_MODE>(LIST_ITEM_MODE.VIEW);
  const { attributes, listeners, setNodeRef } = useSortable({ id });
  const [isPressed, setIsPressed] = useState(false);

  return (
    <Flex
      align="center"
      justify="space-between"
      className="px-2 rounded cursor-pointer"
      style={{
        backgroundColor: isPressed
          ? themeToken.colorPrimaryBg + '90'
          : String(activeId) === String(id)
            ? themeToken.colorPrimaryBg
            : hovered || String(overId) === String(id)
              ? themeToken.colorPrimaryBg + '60'
              : 'transparent',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onClick={() => {
        onClick?.(id);
      }}>
      {mode === LIST_ITEM_MODE.VIEW ? (
        <ReadView
          order={order}
          hovered={hovered}
          setMode={setMode}
          id={id}
          title={title}
          setNodeRef={setNodeRef}
          attributes={attributes}
          listeners={listeners}
          onDeleteItem={onDeleteItem}
          changeable={changeable}
        />
      ) : (
        <EditView id={id} setMode={setMode} value={title} />
      )}
    </Flex>
  );
};
