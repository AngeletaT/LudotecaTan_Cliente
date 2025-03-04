import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from '../../../../../core/services/category/category.service';
import { AuthorService } from '../../../../../core/services/author/author.service';
import { Category } from '../../../../../core/models/category/Category';
import { Author } from '../../../../../core/models/author/Author';
import { Game } from '../../../../../core/models/game/Game';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game-item',
  standalone: true,
  imports: [MatCardModule, CommonModule],
  templateUrl: './game-item.component.html',
  styleUrl: './game-item.component.scss',
})
export class GameItemComponent implements OnInit {
  @Input() game: Game;
  category: Category;
  author: Author;

  constructor(
    private categoryService: CategoryService,
    private authorService: AuthorService
  ) {}

  ngOnInit(): void {
    if (this.game) {
      this.loadCategory();
      this.loadAuthor();
    }
  }

  private loadCategory(): void {
    if (this.game.category && this.game.category.id) {
      this.categoryService.getCategories().subscribe((categories) => {
        const categoryFilter = categories.find(
          (category) => category.id === this.game.category.id
        );
        if (categoryFilter) {
          this.category = categoryFilter;
        }
      });
    }
  }

  private loadAuthor(): void {
    if (this.game.author && this.game.author.id) {
      this.authorService.getAllAuthors().subscribe((authors) => {
        const authorFilter = authors.find(
          (author) => author.id === this.game.author.id
        );
        if (authorFilter) {
          this.author = authorFilter;
        }
      });
    }
  }
}
