import { Component, OnInit, Input } from '@angular/core';
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
export class GameItemComponent {
  @Input() game: Game;
}
