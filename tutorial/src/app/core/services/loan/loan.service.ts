import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Pageable } from '../../models/page/Pageable';
import { Loan } from '../../models/loan/Loan';
import { LoanPage } from '../../models/loan/LoanPage';
import { LOAN_DATA } from '../../models/loan/mock-loan';
import { LOAN_DATA_LIST } from '../../models/loan/mock-loan-list';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LoanService {
  constructor(private http: HttpClient) {}

  private baseUrl = 'http://localhost:8080/loan';

  getLoans(
    pageable: Pageable,
    clientId?: number,
    gameId?: number,
    loanDate?: string
  ): Observable<LoanPage> {
    const body = {
      pageable: pageable,
      clientId: clientId,
      gameId: gameId,
      loanDate: loanDate,
    };
    return this.http.post<LoanPage>(`${this.baseUrl}/filter`, body);
  }

  getAllLoans(): Observable<Loan[]> {
    return this.http.get<Loan[]>(this.baseUrl);
  }

  saveLoan(loan: Loan): Observable<Loan> {
    const { id } = loan;
    const url = id ? `${this.baseUrl}/${id}` : this.baseUrl;
    return this.http.put<Loan>(url, loan);
  }

  deleteLoan(idLoan: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${idLoan}`);
  }
}
