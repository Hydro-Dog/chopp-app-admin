import { useEffect, useState } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragOverlay, DragOverEvent, UniqueIdentifier, DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useThemeToken } from '@shared/hooks';
import { List } from 'antd';

type Item = {
  id: string;
  order: number;
  title: string;
};

type Props = {
  items: Item[];
  onDragEnd: (items: Item[]) => void;
  onDeleteItem?: (val: string) => void;
  onEditItem?: ({ id, title }: { id: string; title: string }) => void;
  ListItem: JSX.Element;
  unchangeableItems: string[];
  activeCategory: string;
  initialCategoryId: string | null;
  onClickItem: (id: string) => void;
};

export const ChopDraggableList = ({ items, onDragEnd, onDeleteItem, onEditItem, onClickItem, initialCategoryId, ListItem, unchangeableItems }: Props) => {
  const themeToken = useThemeToken();
  const [elements, setElements] = useState<Item[]>([]);
  const [draggingId, setDraggingId] = useState<UniqueIdentifier | undefined>();
  const [activeCategoryId, setActiveCategoryId] = useState('');
  const [overId, setOverId] = useState<UniqueIdentifier | undefined>();

  useEffect(() => {
    if (initialCategoryId) {
      console.log('initialCategoryId: ', initialCategoryId);
      setActiveCategoryId(initialCategoryId);
    }
  }, [initialCategoryId]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  useEffect(() => {
    const sortedElements = [...items].sort((a, b) => a.order - b.order);
    setElements(sortedElements);
  }, [items]);

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setDraggingId(active.id);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setDraggingId(undefined);
    setOverId(undefined);

    if (active.id !== over?.id) {
      const oldIndex = elements.findIndex((item) => item.id === active.id);
      const newIndex = elements.findIndex((item) => item.id === over?.id);
      const newElements = arrayMove(elements, oldIndex, newIndex).map((item, index) => ({
        ...item,
        order: index,
      }));
      setElements(newElements);
      onDragEnd(newElements);
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { over } = event;
    setOverId(over?.id);
  };

  const onClick = (item: string) => {
    setActiveCategoryId(item);
    onClickItem(item);
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragStart={handleDragStart} onDragEnd={handleDragEnd} onDragOver={handleDragOver}>
      <SortableContext items={elements.map((item) => item.id)} strategy={verticalListSortingStrategy}>
        <List
          itemLayout="horizontal"
          dataSource={elements}
          renderItem={(item, index) => (
            // @ts-ignore
            <ListItem
              changeable={!unchangeableItems.includes(item.title)}
              onClick={onClick}
              activeId={activeCategoryId}
              order={item.order}
              key={item.id}
              id={item.id}
              index={index}
              title={item.title}
              onDeleteItem={onDeleteItem}
              onEditItem={onEditItem}
              overId={String(overId)}
            />
          )}
        />
      </SortableContext>
      {draggingId && (
        <DragOverlay>
          {elements
            .filter((item) => item.id === draggingId)
            .map((item) => (
              <div
                key={item.id}
                className="rounded shadow w-fit p-2 cursor-pointer"
                style={{
                  background: themeToken.colorBgBase,
                  color: themeToken.colorText,
                }}>
                {item.title}
              </div>
            ))}
        </DragOverlay>
      )}
    </DndContext>
  );
};
