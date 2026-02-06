import { Module } from '@nestjs/common';
import { MatchesService } from './matches.service';
import { MatchesController } from './matches.controller';
import { PlayersModule } from '../players/players.module'; // Import du module complet
import { RankingModule } from '../ranking/ranking.module'; // Import du module complet

@Module({
  imports: [PlayersModule, RankingModule], // C'est grâce à ça que l'injection fonctionne
  controllers: [MatchesController],
  providers: [MatchesService],
})
export class MatchesModule {}