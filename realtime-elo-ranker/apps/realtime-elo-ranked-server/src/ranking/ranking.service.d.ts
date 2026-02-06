import { Player } from '../players/entities/player.entity';
export declare class RankingService {
    private rankingSubject;
    notifyUpdate(player: Player): void;
    getStream(): import("rxjs").Observable<MessageEvent<any>>;
}
