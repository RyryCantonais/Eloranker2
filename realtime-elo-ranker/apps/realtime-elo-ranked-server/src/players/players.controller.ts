import { Controller, Post, Body } from '@nestjs/common';
import { PlayersService } from './players.service';

@Controller('player') // Attention au singulier pour correspondre à ton mock "/api/player"
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  create(@Body() body: { id: string }) {
    return this.playersService.create(body.id);
  }
}