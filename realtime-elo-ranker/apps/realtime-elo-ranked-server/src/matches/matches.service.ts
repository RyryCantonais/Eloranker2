import { Injectable, NotFoundException } from '@nestjs/common';
import { PlayersService } from '../players/players.service';
import { RankingService } from '../ranking/ranking.service';

@Injectable()
export class MatchesService {
  private readonly K_FACTOR = 32; // Valeur K de ton image

  constructor(
    private readonly playersService: PlayersService,
    private readonly rankingService: RankingService,
  ) {}

  async processMatch(winnerId: string, loserId: string, isDraw: boolean) {
    // 1. Récupération des joueurs (Base de données)
    const winner = await this.playersService.findOne(winnerId);
    const loser = await this.playersService.findOne(loserId);

    if (!winner || !loser) {
      throw new NotFoundException('Joueur introuvable');
    }

    // 2. Calcul des probabilités de victoire (We)
    // Formule standard : We = 1 / (1 + 10 ^ ((RankOpposant - RankJoueur) / 400))
    const expectedWinner = this.calculateProbability(winner.rank, loser.rank);
    const expectedLoser = this.calculateProbability(loser.rank, winner.rank);

    // 3. Définition du résultat réel (W)
    // 1 = Victoire, 0.5 = Égalité, 0 = Défaite
    const scoreWinner = isDraw ? 0.5 : 1;
    const scoreLoser = isDraw ? 0.5 : 0;

    // 4. Application de la formule : Rn = Ro + K * (W - We)
    const newRankWinner = winner.rank + this.K_FACTOR * (scoreWinner - expectedWinner);
    const newRankLoser = loser.rank + this.K_FACTOR * (scoreLoser - expectedLoser);

    // 5. Mise à jour et sauvegarde (Arrondi à l'entier le plus proche comme dans l'exemple 1207.68 -> 1208)
    await this.playersService.updateRank(winner.id, Math.round(newRankWinner));
    await this.playersService.updateRank(loser.id, Math.round(newRankLoser));

    // 6. Notification temps réel (SSE)
    // On renvoie les objets mis à jour
    const updatedWinner = await this.playersService.findOne(winnerId);
    const updatedLoser = await this.playersService.findOne(loserId);

    this.rankingService.notifyUpdate(updatedWinner);
    this.rankingService.notifyUpdate(updatedLoser);

    return { winner: updatedWinner, loser: updatedLoser };
  }

  private calculateProbability(rankPlayer: number, rankOpponent: number): number {
    return 1 / (1 + Math.pow(10, (rankOpponent - rankPlayer) / 400));
  }
}