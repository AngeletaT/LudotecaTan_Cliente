import { Component, OnInit } from '@angular/core';
import { Client } from '../../../../core/models/client/Client';
import { ClientService } from '../../../../core/services/client/client.service';
import { ClientEditComponent } from '../client-edit/client-edit.component';
import { DialogConfirmationComponent } from '../../dialog-confirmation/dialog-confirmation.component';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatTableModule, CommonModule],
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.scss',
})
export class ClientListComponent implements OnInit {
  dataSource = new MatTableDataSource<Client>();
  displayedColumns: string[] = ['id', 'name', 'action'];

  constructor(
    private clientService: ClientService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.clientService
      .getClients()
      .subscribe((clients) => (this.dataSource.data = clients));
  }

  createClient() {
    const dialogRef = this.dialog.open(ClientEditComponent, {
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.showSnackBar('Cliente creado correctamente', 'Aceptar');
      }
      this.ngOnInit();
    });
  }

  editClient(client: Client) {
    const dialogRef = this.dialog.open(ClientEditComponent, {
      data: { client },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.showSnackBar('Cliente editado correctamente', 'Aceptar');
      }
      this.ngOnInit();
    });
  }

  deleteClient(client: Client) {
    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      data: {
        title: 'Eliminar Cliente',
        description:
          'Atención si borra el Cliente se perderán sus datos.<br> ¿Desea eliminar el Cliente?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.clientService.deleteClient(client.id).subscribe(
          (result) => {
            this.showSnackBar('Cliente eliminado correctamente', 'Aceptar');
            this.ngOnInit();
          },
          (error) => {
            this.showSnackBar('Error al eliminar el Cliente', 'error');
          }
        );
      }
    });
  }

  private showSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
}
