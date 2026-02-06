import { MatchesService } from './matches.service';
export declare class MatchesController {
    private readonly matchesService;
    constructor(matchesService: MatchesService);
    process(body: {
        winner: string;
        loser: string;
        draw?: boolean;
    }): Promise<{
        winner: import("../players/entities/player.entity").Player;
        loser: import("../players/entities/player.entity").Player;
    }>;
}
