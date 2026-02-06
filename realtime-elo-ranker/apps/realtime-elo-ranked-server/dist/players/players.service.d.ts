import { Repository } from 'typeorm';
import { Player } from './entities/player.entity';
import { RankingService } from '../ranking/ranking.service';
export declare class PlayersService {
    private playersRepository;
    private rankingService;
    constructor(playersRepository: Repository<Player>, rankingService: RankingService);
    create(id: string): Promise<Player>;
    findOne(id: string): Promise<Player>;
    save(player: Player): Promise<Player>;
    findAll(): Promise<Player[]>;
    findAllSortedByRank(): Promise<Player[]>;
    updateRank(id: string, newRank: number): Promise<void>;
}
