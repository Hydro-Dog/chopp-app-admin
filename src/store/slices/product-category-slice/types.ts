export type Category = {
  id: string;
  title: string;
  order: number;
};

export type CreateCategoryDTO = Omit<Category, 'id'>;
