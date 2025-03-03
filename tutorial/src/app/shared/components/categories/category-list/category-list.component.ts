import { Component, OnInit } from '@angular/core';
import { Category } from '../../../../core/models/Category';
import { CategoryService } from '../../../../core/services/category/category.service';
import { CategoryEditComponent } from '../category-edit/category-edit.component';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';

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
    public dialog: MatDialog
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
      this.ngOnInit();
    });
  }

  editCategory(category: Category) {
    const dialogRef = this.dialog.open(CategoryEditComponent, {
      data: { category },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.ngOnInit();
    });
  }
}
