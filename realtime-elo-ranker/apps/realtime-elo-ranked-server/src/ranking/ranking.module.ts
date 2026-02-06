import { Module, forwardRef } from '@nestjs/common';
import { RankingService } from './ranking.service';
import { RankingController } from './ranking.controller';
import { PlayersModule } from '../players/players.module'; // <--- Import du module

@Module({
  imports: [forwardRef(() => PlayersModule)],
  controllers: [RankingController],
  providers: [RankingService],
  exports: [RankingService],
})
export class RankingModule {}