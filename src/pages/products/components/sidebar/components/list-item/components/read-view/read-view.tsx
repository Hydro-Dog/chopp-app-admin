import { Dispatch, ReactNode, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import HeightRoundedIcon from '@mui/icons-material/HeightRounded';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import { Button, Flex, List, Tooltip } from 'antd';

type Props<T> = {
  order: number;
  onDeleteItem?: (id: string) => void;
  onClick?: (id: string) => void;
  hovered: boolean;
  setMode: Dispatch<SetStateAction<'edit' | 'read'>>;
  id: string;
  title: T;
  attributes: any;
  listeners: any;
  setNodeRef: any;
  changeable: boolean;
};

export const ReadView = <T extends ReactNode>({
  order,
  onDeleteItem,
  onClick,
  hovered,
  setMode,
  id,
  title,
  attributes,
  listeners,
  setNodeRef,
  changeable,
}: Props<T>) => {
  const { t } = useTranslation();

  return (
    <>
      <Flex onClick={() => onClick?.(id)}>
        {changeable ? (
          <List.Item ref={setNodeRef} className="!border-0" {...attributes} {...listeners}>
            {hovered ? (
              <Tooltip title={t('DRAG_CATEGORY_TOOLTIP_TEXT')}>
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
        ) : (
          <div className="w-8" />
        )}

        <div className="p-4 cursor-pointer whitespace-nowrap">
          {order + 1}. {title}
        </div>
      </Flex>

      <Flex gap={8}>
        {hovered && changeable && (
          <Tooltip title={t('EDIT_TITLE')}>
            <Button
              shape="circle"
              variant="filled"
              type="text"
              onClick={(e) => {
                e.stopPropagation();
                setMode('edit');
              }}>
              <ModeEditOutlinedIcon />
            </Button>
          </Tooltip>
        )}

        {onDeleteItem && hovered && changeable && (
          <Tooltip title={t('DELETE_CATEGORY')}>
            <Button
              shape="circle"
              color="danger"
              variant="filled"
              onClick={(e) => {
                e.stopPropagation();
                onDeleteItem(id);
              }}>
              <DeleteOutlineRoundedIcon />
            </Button>
          </Tooltip>
        )}
      </Flex>
    </>
  );
};
