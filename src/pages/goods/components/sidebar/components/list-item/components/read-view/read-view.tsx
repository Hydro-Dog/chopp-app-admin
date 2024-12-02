import { Dispatch, ReactNode, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import HeightRoundedIcon from '@mui/icons-material/HeightRounded';
import ModeEditRoundedIcon from '@mui/icons-material/ModeEditRounded';
import { Button, Flex, List, Tooltip } from 'antd';

type Props<T> = {
  order: number;
  onDeleteItem?: (id: string) => void;
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
      <Flex>
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
          {order + 1}. {title} {String(changeable)}
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
              <ModeEditRoundedIcon />
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
              <DeleteForeverRoundedIcon />
            </Button>
          </Tooltip>
        )}
      </Flex>
    </>
  );
};
