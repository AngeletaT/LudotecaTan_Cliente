import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Client } from '../../../../core/models/client/Client';
import { ClientService } from '../../../../core/services/client/client.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-client-edit',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './client-edit.component.html',
  styleUrl: './client-edit.component.scss',
})
export class ClientEditComponent implements OnInit {
  client: Client;
  errorMessage: string | null = null;

  constructor(
    public dialogRef: MatDialogRef<ClientEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { client: Client },
    private clientService: ClientService
  ) {}

  ngOnInit(): void {
    this.client = this.data.client
      ? Object.assign({}, this.data.client)
      : new Client();
  }

  onSave() {
    this.errorMessage = null; // Reset error message before saving
    this.clientService.saveClient(this.client).subscribe(
      () => {
        console.log('Client saved successfully');
        this.dialogRef.close(true);
      },
      (error) => {
        console.log('Error in onSave:', error);
        this.errorMessage = error;
      }
    );
  }

  onClose() {
    this.dialogRef.close();
  }
}
