import {CategoryInterface} from './productTypes';

export interface BrandsTypes {
  id: number;
  name: string;
  slug: string;
  descrition: string;
  logo: string;
  cover_image: string;
  category: CategoryInterface;
  active: string;
}
