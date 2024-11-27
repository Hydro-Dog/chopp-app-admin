import { ReactNode, useEffect, useState } from 'react';
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

type Item<T> = {
  id: string;
  order: number;
  title: T;
};

interface Props<T> {
  items: Item<T>[];
  onDragEnd: (items: Item<T>[]) => void;
  onDeleteItem?: (val: string) => void;
}

export const DragDropList = <T extends ReactNode>({ items, onDragEnd, onDeleteItem }: Props<T>) => {
  const [elements, setElements] = useState<Item<T>[]>([]);

  useEffect(() => {
    const sortedElements = [...items].sort((a, b) => a.order - b.order);
    setElements(sortedElements);
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
      const newElements = arrayMove(elements, oldIndex, newIndex).map((item, index) => ({
        ...item,
        order: index,
      }));
      setElements(newElements);
      onDragEnd(newElements);
    }
  };

  const [activeCategory, setActiveCategory] = useState('')

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext
        items={elements.map((item) => item.id)}
        strategy={verticalListSortingStrategy}>
        <List
          itemLayout="horizontal"
          dataSource={elements}
          renderItem={(item, index) => (
            <ListItem
            onClick={(id) => {
console.log('id: ', id)
              setActiveCategory(id)
            }}
            active={activeCategory}
              order={item.order}
              key={item.id}
              id={item.id}
              index={index}
              title={item.title}
              onDeleteItem={onDeleteItem}
            />
          )}
        />
      </SortableContext>
    </DndContext>
  );
};
