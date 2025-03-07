import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Loan } from '../../../../core/models/loan/Loan';
import { Game } from '../../../../core/models/game/Game';
import { Client } from '../../../../core/models/client/Client';
import { LoanService } from '../../../../core/services/loan/loan.service';
import { GameService } from '../../../../core/services/game/game.service';
import { ClientService } from '../../../../core/services/client/client.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loan-edit',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './loan-edit.component.html',
  styleUrl: './loan-edit.component.scss',
})
export class LoanEditComponent implements OnInit {
  loan: Loan;
  games: Game[];
  clients: Client[];
  errorMessages: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<LoanEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private loanService: LoanService,
    private gameService: GameService,
    private clientService: ClientService
  ) {}

  ngOnInit(): void {
    this.loan = this.data.loan ? Object.assign({}, this.data.loan) : new Loan();

    this.gameService.getGames().subscribe((games) => {
      this.games = games;

      if (this.loan.game != null) {
        const gameFilter: Game[] = games.filter(
          (game) => game.id == this.data.loan.game.id
        );
        if (gameFilter != null) {
          this.loan.game = gameFilter[0];
        }
      }
    });

    this.clientService.getClients().subscribe((clients) => {
      this.clients = clients;

      if (this.loan.client != null) {
        const clientFilter: Client[] = clients.filter(
          (client) => client.id == this.data.loan.client.id
        );
        if (clientFilter != null) {
          this.loan.client = clientFilter[0];
        }
      }
    });
  }

  onSave() {
    this.errorMessages = [];

    // Validacion de fechas
    if (this.loan.rentalDate && this.loan.returnDate) {
      if (this.loan.returnDate < this.loan.rentalDate) {
        this.errorMessages.push(
          'La fecha de fin no puede ser anterior a la fecha de inicio.'
        );
      }

      // Validacion de periodo de prestamo
      const diffTime = Math.abs(
        new Date(this.loan.returnDate).getTime() -
          new Date(this.loan.rentalDate).getTime()
      );
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays > 14) {
        this.errorMessages.push('El periodo de préstamo máximo es de 14 días.');
      }
    } else {
      this.errorMessages.push(
        'Las fechas de préstamo y devolución son obligatorias.'
      );
    }

    // Validacion de conflictos de prestamo
    this.loanService.validateLoan(this.loan).subscribe((validationResponse) => {
      if (!validationResponse.valid) {
        this.errorMessages = this.errorMessages.concat(
          validationResponse.errorMessages
        );
        return;
      } else if (this.errorMessages.length > 0) {
        return;
      } else {
        this.loan.rentalDate = this.formatDate(new Date(this.loan.rentalDate));
        this.loan.returnDate = this.formatDate(new Date(this.loan.returnDate));
        this.loanService.saveLoan(this.loan).subscribe(() => {
          this.dialogRef.close(true);
        });
      }
    });
  }

  onClose() {
    this.dialogRef.close();
  }

  trackByGameId(index: number, game: Game): number {
    return game.id;
  }

  trackByClientId(index: number, client: Client): number {
    return client.id;
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }
}
