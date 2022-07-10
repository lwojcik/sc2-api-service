import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UseCommonErrorResponses } from '../common/decorators/common-error-responses.decorator';
import { RefreshQueryParam } from '../common/decorators/RefreshQueryParam.decorator';
import { LadderService } from './ladder.service';

@ApiTags('ladder')
@Controller('ladder')
export class LadderController {
  constructor(private readonly ladderService: LadderService) {}

  @Get('/grandmaster/:regionId')
  @ApiOperation({
    summary: "Get data for the current season's grandmaster leaderboard.",
  })
  @ApiOkResponse({
    description: 'ok',
  })
  @UseCommonErrorResponses()
  @RefreshQueryParam()
  getGrandmaster(
    @Param('regionId') regionId: string,
    @Query('refresh') refresh?: boolean
  ) {
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
  @ApiOkResponse()
  @UseCommonErrorResponses()
  @RefreshQueryParam()
  getSeason(
    @Param('regionId') regionId: string,
    @Query('refresh') refresh?: boolean
  ) {
    return this.ladderService.getSeason(
      {
        regionId,
      },
      refresh
    );
  }
}
