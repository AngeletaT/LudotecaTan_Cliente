import { Pageable } from '../page/Pageable';
import { Loan } from './Loan';

export class LoanPage {
  content: Loan[];
  pageable: Pageable;
  totalElements: number;
}
