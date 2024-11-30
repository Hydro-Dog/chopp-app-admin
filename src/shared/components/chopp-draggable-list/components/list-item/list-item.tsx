import { ReactNode, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSortable } from '@dnd-kit/sortable';
import { useThemeToken } from '@shared/hooks';
import { Flex } from 'antd';
import { EditView } from './components';
import { ReadView } from './components/read-view';

type Props = {
  id: string;
  overId?: string;
  index: number;
  title: string;
  order: number;
  active?: string;
  onDeleteItem?: (id: string) => void;
  onEditItem?: ({ id, title }: { id: string; title: string }) => void;
  onClick?: (id: string) => void;
};

export const ListItem = ({
  id,
  overId,
  title,
  order,
  active,
  onDeleteItem,
  onEditItem,
  onClick,
}: Props) => {
  const themeToken = useThemeToken();
  const [hovered, setHovered] = useState(false);
  const [mode, setMode] = useState<'edit' | 'read'>('read');
  const { attributes, listeners, setNodeRef } = useSortable({ id });
  const [isPressed, setIsPressed] = useState(false);

  return (
    <Flex
      align="center"
      justify="space-between"
      className="px-2 rounded cursor-pointer"
      style={{
        backgroundColor:
          hovered || String(overId) === String(id)
            ? themeToken.colorPrimaryBg + '60'
            : isPressed
              ? themeToken.colorPrimaryBg + 'cc'
              : active === id
                ? themeToken.colorPrimaryBg
                : 'transparent',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onClick={() => {
        onClick?.(id);
      }}>
      {mode === 'read' ? (
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
        />
      ) : (
        <EditView
          setMode={setMode}
          onChange={(title) => {
            onEditItem?.({ title, id });
          }}
          value={title}
        />
      )}
      {/* <Flex>
        <List.Item ref={setNodeRef} className="!border-0" {...attributes} {...listeners}>
          {hovered ? (
            <Tooltip mouseEnterDelay={1} placement="right" title={t('DRAG_CATEGORY_TOOLTIP_TEXT')}>
              <Button
                shape="circle"
                variant="filled"
                type="text"
                onClick={(e) => {
                  e.stopPropagation();
                }}>
                <HeightRoundedIcon />
              </Button>
            </Tooltip>
          ) : (
            <div className="w-8" />
          )}
        </List.Item>

        <div className="p-4 cursor-pointer whitespace-nowrap">
          {order + 1}. {title}
        </div>
      </Flex>

      <Flex gap={8}>
        {hovered && (
          // TODO: Добавить на удаление категорию модалку "Вы уверены что хотите удалить категорию?
          // Товары из этой категории попадут в раздел Без Категории"
          <Tooltip title={t('DELETE_CATEGORY')}>
            <Button
              shape="circle"
              variant="filled"
              type="text"
              onClick={(e) => {
                e.stopPropagation();
                setMode('edit');
              }}>
              <ModeEditRoundedIcon />
            </Button>
          </Tooltip>
        )}

        {onDeleteItem && hovered && (
          // TODO: Добавить на удаление категорию модалку "Вы уверены что хотите удалить категорию?
          // Товары из этой категории попадут в раздел Без Категории"
          <Tooltip title={t('DELETE_CATEGORY')}>
            <Button
              shape="circle"
              color="danger"
              variant="filled"
              onClick={(e) => {
                e.stopPropagation();
                onDeleteItem(id);
              }}>
              <DeleteForeverRoundedIcon />
            </Button>
          </Tooltip>
        )}
      </Flex> */}
    </Flex>
  );
};
