import { useEffect, useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { List } from 'antd';
import { ListItem } from './components/index';

interface Item {
  id: string;
  title: string;
  order: number;
}

interface Props {
  items: Item[];
  onDragEnd: (items: Item[]) => void;
}

const DragDropList = ({ items, onDragEnd }: Props) => {
  console.log('items: ', items);
  const [elements, setElements] = useState<Item[]>([]);

  useEffect(() => {
    const elements = [...items].sort((a, b) => a.order - b.order);
    setElements(elements);
  }, [items]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = elements.findIndex((item) => item.id === active.id);
      const newIndex = elements.findIndex((item) => item.id === over.id);
      const newElements = arrayMove(elements, oldIndex, newIndex);
      setElements(newElements);
      onDragEnd(newElements);
    }
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext
        items={elements?.map((item) => item.id)}
        strategy={verticalListSortingStrategy}>
        <List
          itemLayout="horizontal"
          dataSource={elements}
          renderItem={(item, index) => (
            <ListItem key={item.id} id={item.id} index={index} item={item} />
          )}
        />
      </SortableContext>
    </DndContext>
  );
};

export default DragDropList;
