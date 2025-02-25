import { ProductImage } from '@shared/index';

export const sortImages = ({
  images = [],
  imagesOrder = [],
}: {
  images?: ProductImage[];
  imagesOrder?: number[];
}) => {
  // Создаем новый массив, где элементы соответствуют порядку в imagesOrder
  const sortedImages = imagesOrder.map((id) => images.find((image) => image.id === id));

  return sortedImages;
};
