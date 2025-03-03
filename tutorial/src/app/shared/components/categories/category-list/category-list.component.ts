import { Component, OnInit } from '@angular/core';
import { Category } from '../../../../core/models/category/Category';
import { CategoryService } from '../../../../core/services/category/category.service';
import { CategoryEditComponent } from '../category-edit/category-edit.component';
import { DialogConfirmationComponent } from '../../dialog-confirmation/dialog-confirmation.component';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatTableModule, CommonModule],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss',
})
export class CategoryListComponent implements OnInit {
  dataSource = new MatTableDataSource<Category>();
  displayedColumns: string[] = ['id', 'name', 'action'];

  constructor(
    private categoryService: CategoryService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.categoryService
      .getCategories()
      .subscribe((categories) => (this.dataSource.data = categories));
  }

  createCategory() {
    const dialogRef = this.dialog.open(CategoryEditComponent, {
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.showSnackBar('Categoría creada correctamente', 'Aceptar');
      }
      this.ngOnInit();
    });
  }

  editCategory(category: Category) {
    const dialogRef = this.dialog.open(CategoryEditComponent, {
      data: { category },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.showSnackBar('Categoría editada correctamente', 'Aceptar');
      }
      this.ngOnInit();
    });
  }

  deleteCategory(category: Category) {
    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      data: {
        title: 'Eliminar categoría',
        description:
          'Atención si borra la categoría se perderán sus datos.<br> ¿Desea eliminar la categoría?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.categoryService.deleteCategory(category.id).subscribe(
          (result) => {
            this.showSnackBar('Categoría eliminada correctamente', 'Aceptar');
            this.ngOnInit();
          },
          (error) => {
            this.showSnackBar('Error al eliminar la categoría', 'error');
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
