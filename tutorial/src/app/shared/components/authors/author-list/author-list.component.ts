import { Component, OnInit } from '@angular/core';
import { Author } from '../../../../core/models/author/Author';
import { AuthorService } from '../../../../core/services/author/author.service';
import { Pageable } from '../../../../core/models/page/Pageable';
import { DialogConfirmationComponent } from '../../dialog-confirmation/dialog-confirmation.component';
import { AuthorEditComponent } from '../author-edit/author-edit.component';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-author-list',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    CommonModule,
  ],
  templateUrl: './author-list.component.html',
  styleUrl: './author-list.component.scss',
})
export class AuthorListComponent implements OnInit {
  pageNumber: number = 0;
  pageSize: number = 5;
  totalElements: number = 0;

  dataSource = new MatTableDataSource<Author>();
  displayedColumns: string[] = ['id', 'name', 'nationality', 'action'];

  constructor(private authorService: AuthorService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadPage();
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

    this.authorService.getAuthors(pageable).subscribe((data) => {
      this.dataSource.data = data.content;
      this.pageNumber = data.pageable.pageNumber;
      this.pageSize = data.pageable.pageSize;
      this.totalElements = data.totalElements;
    });
  }

  createAuthor() {
    const dialogRef = this.dialog.open(AuthorEditComponent, {
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.loadPage();
    });
  }

  editAuthor(author: Author) {
    const dialogRef = this.dialog.open(AuthorEditComponent, {
      data: { author: author },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.loadPage();
    });
  }

  deleteAuthor(author: Author) {
    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      data: {
        title: 'Eliminar autor',
        description:
          'Atención si borra el autor se perderán sus datos.<br> ¿Desea eliminar el autor?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.authorService.deleteAuthor(author.id).subscribe((result) => {
          this.loadPage();
        });
      }
    });
  }
}
