import { Injectable } from '@nestjs/common';
import { Subject } from 'rxjs';
import { Player } from '../players/entities/player.entity';

@Injectable()
export class RankingService {
  // Un "Subject" permet de diffuser des événements à plusieurs abonnés
  private rankingSubject = new Subject<MessageEvent>();

  // Appelé par le MatchesService quand un match est fini
  notifyUpdate(player: Player) {
    this.rankingSubject.next({
      data: {
        type: 'RankingUpdate',
        player: player,
      },
    } as MessageEvent);
  }

  getStream() {
    return this.rankingSubject.asObservable();
  }
}