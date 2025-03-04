import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Game } from '../../../../core/models/game/Game';
import { GameService } from '../../../../core/services/game/game.service';
import { Category } from '../../../../core/models/category/Category';
import { CategoryService } from '../../../../core/services/category/category.service';
import { Author } from '../../../../core/models/author/Author';
import { AuthorService } from '../../../../core/services/author/author.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-game-edit',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
  ],
  templateUrl: './game-edit.component.html',
  styleUrl: './game-edit.component.scss',
})
export class GameEditComponent implements OnInit {
  game: Game;
  authors: Author[];
  categories: Category[];

  constructor(
    public dialogRef: MatDialogRef<GameEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private gameService: GameService,
    private categoryService: CategoryService,
    private authorService: AuthorService
  ) {}

  ngOnInit(): void {
    this.game = this.data.game ? Object.assign({}, this.data.game) : new Game();

    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;

      if (this.game.category != null) {
        const categoryFilter: Category[] = categories.filter(
          (category) => category.id == this.data.game.category.id
        );
        if (categoryFilter != null) {
          this.game.category = categoryFilter[0];
        }
      }
    });

    this.authorService.getAllAuthors().subscribe((authors) => {
      this.authors = authors;

      if (this.game.author != null) {
        const authorFilter: Author[] = authors.filter(
          (author) => author.id == this.data.game.author.id
        );
        if (authorFilter != null) {
          this.game.author = authorFilter[0];
        }
      }
    });
  }

  onSave() {
    this.gameService.saveGame(this.game).subscribe((result) => {
      this.dialogRef.close(true);
    });
  }

  onClose() {
    this.dialogRef.close();
  }
}
