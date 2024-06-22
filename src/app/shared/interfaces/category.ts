import { Image } from './image';
export interface Category {
  id: number;
  name: string;
  description: string;
  is_active: boolean;
  childrens: Category[];
  images: Image[];
  parent: Category | null;
}
