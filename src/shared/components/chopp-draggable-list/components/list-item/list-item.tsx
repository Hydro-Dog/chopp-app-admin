import { ReactNode, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSortable } from '@dnd-kit/sortable';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import HeightRoundedIcon from '@mui/icons-material/HeightRounded';
import { useThemeToken } from '@shared/hooks';
import { Button, Flex, List, Tooltip } from 'antd';

interface Props<T> {
  id: string;
  overId?: string;
  index: number;
  title: T;
  order: number;
  active?: string;
  onDeleteItem?: (id: string) => void;
  onClick?: (id: string) => void;
}

export const ListItem = <T extends ReactNode>({
  id,
  overId,
  title,
  order,
  active,
  onDeleteItem,
  onClick,
}: Props<T>) => {
  const themeToken = useThemeToken();
  const { t } = useTranslation();
  const [hovered, setHovered] = useState(false);
  const { attributes, listeners, setNodeRef } = useSortable({ id });
  const [isPressed, setIsPressed] = useState(false);

  return (
    <Flex
      align="center"
      justify="space-between"
      className="px-2 rounded"
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
      <Flex>
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

      {onDeleteItem && hovered ? (
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
      ) : (
        <div className="w-6" />
      )}
    </Flex>
  );
};
