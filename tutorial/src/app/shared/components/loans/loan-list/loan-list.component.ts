import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoanService } from '../../../../core/services/loan/loan.service';
import { GameService } from '../../../../core/services/game/game.service';
import { ClientService } from '../../../../core/services/client/client.service';
import { Loan } from '../../../../core/models/loan/Loan';
import { Game } from '../../../../core/models/game/Game';
import { Client } from '../../../../core/models/client/Client';
import { Pageable } from '../../../../core/models/page/Pageable';
import { LoanEditComponent } from '../loan-edit/loan-edit.component';
import { DialogConfirmationComponent } from '../../dialog-confirmation/dialog-confirmation.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PageEvent } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-loan-list',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './loan-list.component.html',
  styleUrl: './loan-list.component.scss',
})
export class LoanListComponent implements OnInit {
  clients: Client[] = [];
  games: Game[] = [];
  loans: Loan[] = [];
  filterClient: Client;
  filterGame: Game;
  filterDate: string;
  pageNumber: number = 0;
  pageSize: number = 5;
  totalElements: number = 0;

  dataSource = new MatTableDataSource<Loan>();
  displayedColumns: string[] = [
    'id',
    'game',
    'client',
    'rentalDate',
    'returnDate',
    'actions',
  ];

  constructor(
    private loanService: LoanService,
    private gameService: GameService,
    private clientService: ClientService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadPage();
    this.clientService
      .getClients()
      .subscribe((clients) => (this.clients = clients));
    this.gameService.getGames().subscribe((games) => (this.games = games));
  }

  loadPage(event?: PageEvent) {
    const pageable: Pageable = {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      sort: [
        {
          property: 'id',
          direction: 'ASC',
        },
      ],
    };

    if (event != null) {
      pageable.pageSize = event.pageSize;
      pageable.pageNumber = event.pageIndex;
    }

    this.loanService
      .getLoans(
        pageable,
        this.filterClient?.id,
        this.filterGame?.id,
        this.filterDate
      )
      .subscribe((data) => {
        this.dataSource.data = data.content;
        this.pageNumber = data.pageable.pageNumber;
        this.pageSize = data.pageable.pageSize;
        this.totalElements = data.totalElements;
      });
  }

  onCleanFilter(): void {
    this.filterClient = null;
    this.filterGame = null;
    this.filterDate = null;
    this.onSearch();
  }

  onSearch(): void {
    this.loadPage();
  }

  onDateChange(event: any): void {
    const date = event.value;
    this.filterDate = date ? this.formatDate(date) : null;
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  createLoan() {
    const dialogRef = this.dialog.open(LoanEditComponent, {
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.showSnackBar('Juego creado correctamente', 'Aceptar');
      }
      this.ngOnInit();
    });
  }

  deleteLoan(loan: Loan) {
    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      data: {
        title: 'Eliminar autor',
        description:
          'Atención si borra el autor se perderán sus datos.<br> ¿Desea eliminar el autor?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loanService.deleteLoan(loan.id).subscribe(
          (result) => {
            this.showSnackBar('Autor eliminado correctamente', 'Aceptar');
            this.loadPage();
          },
          (error) => {
            this.showSnackBar('Error al eliminar el Autor', 'error');
          }
        );
      }
    });
  }

  trackByClientId(index: number, client: Client): number {
    return client.id;
  }

  trackByGameId(index: number, game: Game): number {
    return game.id;
  }

  private showSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
}
