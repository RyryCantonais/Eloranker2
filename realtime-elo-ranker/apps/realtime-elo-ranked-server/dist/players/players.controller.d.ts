import { PlayersService } from './players.service';
export declare class PlayersController {
    private readonly playersService;
    constructor(playersService: PlayersService);
    create(body: {
        id: string;
    }): Promise<import("./entities/player.entity").Player>;
}
