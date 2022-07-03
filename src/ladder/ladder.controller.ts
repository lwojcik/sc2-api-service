import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RefreshQueryParam } from '../common/decorators/RefreshQueryParam.decorator';
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
  @RefreshQueryParam()
  getGrandmaster(
    @Param('regionId') regionId: string,
    @Query('refresh') refresh?: boolean
  ) {
    this.logger.setLoggedMethod(this.getGrandmaster.name, {
      regionId,
      refresh,
    });
    this.logger.debug();

    return this.ladderService.getGrandmaster(
      {
        regionId,
      },
      refresh
    );
  }

  @Get('/season/:regionId')
  @ApiOperation({
    summary: "Get data for the current season's grandmaster leaderboard.",
  })
  @RefreshQueryParam()
  getSeason(
    @Param('regionId') regionId: string,
    @Query('refresh') refresh?: boolean
  ) {
    this.logger.setLoggedMethod(this.getSeason.name, { regionId, refresh });
    this.logger.debug();

    return this.ladderService.getSeason(
      {
        regionId,
      },
      refresh
    );
  }
}
