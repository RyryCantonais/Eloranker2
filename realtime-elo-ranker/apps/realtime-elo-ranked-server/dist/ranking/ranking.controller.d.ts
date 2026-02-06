import { MessageEvent } from '@nestjs/common';
import { RankingService } from './ranking.service';
import { PlayersService } from '../players/players.service';
import { Observable } from 'rxjs';
export declare class RankingController {
    private readonly rankingService;
    private readonly playersService;
    constructor(rankingService: RankingService, playersService: PlayersService);
    getRanking(): Promise<import("../players/entities/player.entity").Player[]>;
    events(): Observable<MessageEvent>;
}
