import { Category } from '@shared/index';

export type CreateCategoryDTO = Omit<Category, 'id'>;
