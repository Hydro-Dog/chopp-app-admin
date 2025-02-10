import { Dispatch, ReactNode, SetStateAction } from 'react';
import { Flex, List } from 'antd';
import { MoveButton } from './components';
import { LIST_ITEM_MODE } from '../../enum';
import { DeleteButton } from './components/delete-button';
import { EditButton } from './components/edit-button';

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
  return (
    <>
      <Flex onClick={() => onClick?.(id)}>
        <div className="p-4 cursor-pointer whitespace-nowrap">
          {order + 1}. {title}
        </div>
      </Flex>

      <Flex gap={8} align="center">
        {changeable && (
          <List.Item ref={setNodeRef} className="!border-0" {...attributes} {...listeners}>
            {hovered ? <MoveButton /> : <div className="w-8" />}
          </List.Item>
        )}

        {hovered && changeable && <EditButton setMode={setMode} />}
        {onDeleteItem && hovered && changeable && (
          <DeleteButton onDeleteItem={() => onDeleteItem(id)} />
        )}
      </Flex>
    </>
  );
};
