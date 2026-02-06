import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayersModule } from './players/players.module';
import { MatchesModule } from './matches/matches.module';
import { RankingModule } from './ranking/ranking.module';
import { Player } from './players/entities/player.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqljs',
      location: 'data/elo.sqlite', // Le fichier sera créé ici
      autoSave: true,
      entities: [Player],
      synchronize: true, // Crée les tables automatiquement (dev mode)
    }),
    PlayersModule,
    MatchesModule,
    RankingModule,
  ],
})
export class AppModule {}