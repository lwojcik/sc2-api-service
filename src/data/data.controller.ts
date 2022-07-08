import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiResponse } from '../common/types';
import { UseCommonErrorResponses } from '../common/decorators/common-error-responses.decorator';
import { RefreshQueryParam } from '../common/decorators/RefreshQueryParam.decorator';
import { DataService } from './data.service';

@ApiTags('data')
@Controller('data')
export class DataController {
  constructor(private readonly dataService: DataService) {}

  @Get('/league/:seasonId/:queueId/:teamType/:leagueId')
  @ApiOperation({
    summary: 'Get data for the specified season, queue, team, and league.',
  })
  @ApiOkResponse({
    description: ApiResponse.ok,
  })
  @UseCommonErrorResponses()
  @RefreshQueryParam()
  getLeague(
    @Param('seasonId') seasonId: number,
    @Param('queueId') queueId: number,
    @Param('teamType') teamType: number,
    @Param('leagueId') leagueId: number,
    @Query('refresh') refresh?: boolean
  ) {
    return this.dataService.getLeague(
      {
        seasonId,
        queueId,
        teamType,
        leagueId,
      },
      refresh
    );
  }
}
