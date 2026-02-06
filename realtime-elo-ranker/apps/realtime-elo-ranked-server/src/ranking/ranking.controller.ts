import { Controller, Get, Sse, MessageEvent } from '@nestjs/common';
import { RankingService } from './ranking.service';
import { PlayersService } from '../players/players.service'; // Vérifiez que ce chemin est correct
import { Observable } from 'rxjs';

@Controller('ranking')
export class RankingController {
  constructor(
    private readonly rankingService: RankingService,
    private readonly playersService: PlayersService
  ) {}

  @Get()
  async getRanking() {
    // CORRECTION : On demande à la base de données de trier (DESC = descendant)
    // Cela évite l'erreur de typage sur le .sort()
    return this.playersService.findAllSortedByRank(); 
  }

  @Sse('events')
  events(): Observable<MessageEvent> {
    return this.rankingService.getStream();
  }
}