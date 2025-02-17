/**
 * Обновляет элемент в массиве по его `id`, заменяя его новым значением.
 * @param items - Исходный массив элементов
 * @param updatedItem - Обновленный элемент
 * @returns Новый массив с обновленным элементом
 */
export const updateListItemById = <T extends { id: number | string }>(
  items: T[],
  updatedItem: T,
): T[] => {
  return items.map((item) => (item.id === updatedItem.id ? updatedItem : item));
};
