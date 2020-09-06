import {Category} from './category';

export interface Outcome {
  id?: number;
  title?: string;
  categories?: Category[];
  template?: any;
}
