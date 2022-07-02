import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoggerService } from '../logger/logger.service';
import { LadderService } from './ladder.service';

@ApiTags('ladder')
@Controller('ladder')
export class LadderController {
  constructor(
    private readonly ladderService: LadderService,
    private readonly logger: LoggerService
  ) {
    this.logger.setLoggedClass(LadderController.name);
  }

  @Get('/grandmaster/:regionId')
  @ApiOperation({
    summary: "Get data for the current season's grandmaster leaderboard.",
  })
  getLeague(@Param('regionId') regionId: string) {
    this.logger.setLoggedMethod(this.getLeague.name);
    this.logger.debug();

    return this.ladderService.getGrandmaster({
      regionId,
    });
  }

  @Get('/season/:regionId')
  @ApiOperation({
    summary: "Get data for the current season's grandmaster leaderboard.",
  })
  getSeason(@Param('regionId') regionId: string) {
    this.logger.setLoggedMethod(this.getSeason.name);
    this.logger.debug();

    return this.ladderService.getSeason({
      regionId,
    });
  }
}
