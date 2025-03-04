import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Game } from '../../models/game/Game';
import { GAME_DATA } from '../../models/game/mock-games';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor() {}

  getGames(title?: string, categoryId?: number): Observable<Game[]> {
    return of(GAME_DATA);
  }

  saveGame(game: Game): Observable<void> {
    return of(null);
  }
}
