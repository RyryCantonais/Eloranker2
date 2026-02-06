import { PlayersService } from '../players/players.service';
import { RankingService } from '../ranking/ranking.service';
export declare class MatchesService {
    private readonly playersService;
    private readonly rankingService;
    private readonly K_FACTOR;
    constructor(playersService: PlayersService, rankingService: RankingService);
    processMatch(winnerId: string, loserId: string, isDraw: boolean): Promise<{
        winner: import("../players/entities/player.entity").Player;
        loser: import("../players/entities/player.entity").Player;
    }>;
    private calculateProbability;
}
