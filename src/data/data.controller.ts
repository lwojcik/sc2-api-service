import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoggerService } from '../logger/logger.service';
import { DataService } from './data.service';

@ApiTags('data')
@Controller('data')
export class DataController {
  constructor(
    private readonly dataService: DataService,
    private readonly logger: LoggerService
  ) {
    this.logger.setLoggedClass(DataController.name);
  }

  @Get('/league/:seasonId/:queueId/:teamType/:leagueId')
  @ApiOperation({
    summary: 'Get data for the specified season, queue, team, and league.',
  })
  // @ApiOkResponse({
  //   description: ApiResponse.ok,
  //   type: StatusResponse,
  // })
  // @ApiBadRequestResponse({
  //   description: ApiResponse.badRequest,
  // })
  // @ApiUnauthorizedResponse({
  //   description: ApiResponse.unauthorized,
  //   type: UnauthorizedError,
  // })
  // @ApiTooManyRequestsResponse({
  //   description: ApiResponse.tooManyRequests,
  //   type: TooManyRequestsError,
  // })
  getLeague(
    @Param('seasonId') seasonId: number,
    @Param('queueId') queueId: number,
    @Param('teamType') teamType: number,
    @Param('leagueId') leagueId: number,
    @Query('refresh') refresh?: boolean
  ) {
    this.logger.setLoggedMethod(this.getLeague.name);
    this.logger.debug();

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
