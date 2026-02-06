import { Repository } from 'typeorm';
import { Player } from './entities/player.entity';
export declare class PlayersService {
    private playersRepository;
    constructor(playersRepository: Repository<Player>);
    create(id: string): Promise<Player>;
    findOne(id: string): Promise<Player>;
    save(player: Player): Promise<Player>;
    findAll(): Promise<Player[]>;
    findAllSortedByRank(): Promise<Player[]>;
    updateRank(id: string, newRank: number): Promise<void>;
}
