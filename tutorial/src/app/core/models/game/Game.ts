import { Author } from '../author/Author';
import { Category } from '../category/Category';

export class Game {
  id: number;
  title: string;
  age: number;
  category: Category;
  author: Author;
}
