import { Loan } from './Loan';

export const LOAN_DATA_LIST: Loan[] = [
  {
    id: 1,
    rentalDate: '2021-06-01',
    returnDate: '2021-06-08',
    game: {
      id: 1,
      title: 'Juego 1',
      age: 6,
      category: { id: 1, name: 'Categoría 1' },
      author: { id: 1, name: 'Autor 1', nationality: 'US' },
    },
    client: { id: 1, name: 'Cliente 1' },
  },
  {
    id: 2,
    rentalDate: '2021-06-02',
    returnDate: '2021-06-09',
    game: {
      id: 2,
      title: 'Juego 2',
      age: 8,
      category: { id: 2, name: 'Categoría 2' },
      author: { id: 2, name: 'Autor 2', nationality: 'UK' },
    },
    client: { id: 2, name: 'Cliente 2' },
  },
  {
    id: 3,
    rentalDate: '2021-06-03',
    returnDate: '2021-06-10',
    game: {
      id: 3,
      title: 'Juego 3',
      age: 10,
      category: { id: 3, name: 'Categoría 3' },
      author: { id: 3, name: 'Autor 3', nationality: 'FR' },
    },
    client: { id: 3, name: 'Cliente 3' },
  },
];
