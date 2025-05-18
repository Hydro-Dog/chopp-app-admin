import { Dispatch, ReactNode, SetStateAction } from 'react';
import { Flex, List } from 'antd';
import { MoveButton } from './components';
import { LIST_ITEM_MODE } from '../../enum';
import { DeleteButton } from './components/delete-button';
import { EditButton } from './components/edit-button';
import { ChoppTextWithTooltip } from '@shared/index';
import { useTranslation } from 'react-i18next';

type Props<T> = {
  order: number;
  onDeleteItem?: (id: string) => void;
  onClick?: (id: string) => void;
  hovered: boolean;
  setMode: Dispatch<SetStateAction<LIST_ITEM_MODE>>;
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
    <Flex justify="space-between" align="center" style={{ width: '100%' }}>
      <Flex onClick={() => onClick?.(id)} style={{ minWidth: 0, flex: 1 }}>
        <div
          style={{
            padding: '16px',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>
          <span className="truncate block" title={typeof title === 'string' ? title : undefined}>
            <ChoppTextWithTooltip
              tooltipText={title === 'Другое' ? t('THIS_CATEGORY_IS_HIDDEN_FROM_USERS') : undefined}
              showInfoIcon={title === 'Другое'}
              title={`${order + 1}. ${title}`}
            />
          </span>
        </div>
      </Flex>

      <Flex gap={8} align="center">
        {changeable && (
          <List.Item ref={setNodeRef} className="!p-1" {...attributes} {...listeners}>
            {hovered ? <MoveButton /> : <div className="w-8" />}
          </List.Item>
        )}
        {hovered && changeable && <EditButton setMode={setMode} />}
        {onDeleteItem && hovered && changeable && (
          <DeleteButton onDeleteItem={() => onDeleteItem(id)} />
        )}
      </Flex>
    </Flex>
  );
};
