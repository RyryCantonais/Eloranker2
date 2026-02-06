import { Controller, Post, Body } from '@nestjs/common';
import { MatchesService } from './matches.service';

@Controller('match') // Singulier pour correspondre au mock "/api/match"
export class MatchesController {
  constructor(private readonly matchesService: MatchesService) {}

  @Post()
  process(@Body() body: { winner: string; loser: string; draw?: boolean }) {
    // Le mock envoie "winner" et "loser" comme ID, et "draw" optionnel
    return this.matchesService.processMatch(body.winner, body.loser, !!body.draw);
  }
}