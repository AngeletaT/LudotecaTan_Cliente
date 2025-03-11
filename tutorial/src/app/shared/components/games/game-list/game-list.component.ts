import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GameEditComponent } from '../game-edit/game-edit.component';
import { GameService } from '../../../../core/services/game/game.service';
import { Game } from '../../../../core/models/game/Game';
import { Category } from '../../../../core/models/category/Category';
import { CategoryService } from '../../../../core/services/category/category.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GameItemComponent } from './game-item/game-item.component';

@Component({
  selector: 'app-game-list',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    GameItemComponent,
  ],
  templateUrl: './game-list.component.html',
  styleUrl: './game-list.component.scss',
})
export class GameListComponent implements OnInit {
  categories: Category[] = [];
  games: Game[] = [];
  filterCategory: Category;
  filterTitle: string;
  isLoggedIn: boolean = false;

  constructor(
    private gameService: GameService,
    private categoryService: CategoryService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.checkLoginStatus();
    this.gameService.getGames().subscribe((games) => (this.games = games));
    this.categoryService
      .getCategories()
      .subscribe((categories) => (this.categories = categories));
  }

  checkLoginStatus() {
    const token = sessionStorage.getItem('token');
    this.isLoggedIn = !!token;
  }

  onCleanFilter(): void {
    this.filterTitle = null;
    this.filterCategory = null;
    this.onSearch();
  }

  onSearch(): void {
    const title = this.filterTitle;
    const categoryId =
      this.filterCategory != null ? this.filterCategory.id : null;

    this.gameService
      .getGames(title, categoryId)
      .subscribe((games) => (this.games = games));
  }

  createGame() {
    const dialogRef = this.dialog.open(GameEditComponent, {
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.showSnackBar('Juego creado correctamente', 'Aceptar');
      }
      this.ngOnInit();
    });
  }

  editGame(game: Game) {
    const dialogRef = this.dialog.open(GameEditComponent, {
      data: { game: game },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.showSnackBar('Juego editado correctamente', 'Aceptar');
      }
      this.onSearch();
    });
  }

  trackByCategoryId(index: number, category: Category): number {
    return category.id;
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
