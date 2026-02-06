import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from './entities/player.entity';
import { RankingService } from '../ranking/ranking.service';

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(Player)
    private playersRepository: Repository<Player>,
    @Inject(forwardRef(() => RankingService))
    private rankingService: RankingService,
  ) {}

  // --- Méthodes de base (CRUCIALES pour que le reste fonctionne) ---

  async create(id: string): Promise<Player> {
    const existing = await this.playersRepository.findOneBy({ id });
    if (existing) return existing;

    const newPlayer = this.playersRepository.create({ id, rank: 1000 });
    const savedPlayer = await this.playersRepository.save(newPlayer);
    
    this.rankingService.notifyUpdate(savedPlayer); // Notifie le classement
    
    return savedPlayer;
  }

  findOne(id: string) {
    return this.playersRepository.findOneBy({ id });
  }

  async save(player: Player) {
    return this.playersRepository.save(player);
  }

  // --- Méthodes de lecture ---

  findAll() {
    return this.playersRepository.find();
  }

  // Méthode optimisée pour le classement (Tri par la base de données)
  findAllSortedByRank() {
    return this.playersRepository.find({
      order: {
        rank: 'DESC', // Trie du plus grand au plus petit
      },
    });
  }

  // --- Méthodes de mise à jour ---

  async updateRank(id: string, newRank: number) {
    const player = await this.findOne(id); // Maintenant findOne existe !
    if (player) {
      player.rank = newRank;
      await this.save(player); // Maintenant save existe !
    }
  }
}