import { Client } from '../client/Client';
import { Game } from '../game/Game';

export class Loan {
  id: number;
  rentalDate: string;
  returnDate: string;
  game: Game;
  client: Client;
}
