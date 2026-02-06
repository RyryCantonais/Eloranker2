"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchesService = void 0;
const common_1 = require("@nestjs/common");
const players_service_1 = require("../players/players.service");
const ranking_service_1 = require("../ranking/ranking.service");
let MatchesService = class MatchesService {
    constructor(playersService, rankingService) {
        this.playersService = playersService;
        this.rankingService = rankingService;
        this.K_FACTOR = 32;
    }
    async processMatch(winnerId, loserId, isDraw) {
        const winner = await this.playersService.findOne(winnerId);
        const loser = await this.playersService.findOne(loserId);
        if (!winner || !loser) {
            throw new common_1.NotFoundException('Joueur introuvable');
        }
        const expectedWinner = this.calculateProbability(winner.rank, loser.rank);
        const expectedLoser = this.calculateProbability(loser.rank, winner.rank);
        const scoreWinner = isDraw ? 0.5 : 1;
        const scoreLoser = isDraw ? 0.5 : 0;
        const newRankWinner = winner.rank + this.K_FACTOR * (scoreWinner - expectedWinner);
        const newRankLoser = loser.rank + this.K_FACTOR * (scoreLoser - expectedLoser);
        await this.playersService.updateRank(winner.id, Math.round(newRankWinner));
        await this.playersService.updateRank(loser.id, Math.round(newRankLoser));
        const updatedWinner = await this.playersService.findOne(winnerId);
        const updatedLoser = await this.playersService.findOne(loserId);
        this.rankingService.notifyUpdate(updatedWinner);
        this.rankingService.notifyUpdate(updatedLoser);
        return { winner: updatedWinner, loser: updatedLoser };
    }
    calculateProbability(rankPlayer, rankOpponent) {
        return 1 / (1 + Math.pow(10, (rankOpponent - rankPlayer) / 400));
    }
};
exports.MatchesService = MatchesService;
exports.MatchesService = MatchesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [players_service_1.PlayersService,
        ranking_service_1.RankingService])
], MatchesService);
//# sourceMappingURL=matches.service.js.map