import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { List } from 'antd';

interface Props {
  id: string;
  index: number;
  item: {
    id: string;
    title: string;
  };
}

export const ListItem = ({ item }: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <List.Item ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {item.title}
    </List.Item>
  );
};

export default ListItem;
