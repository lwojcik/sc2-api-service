import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RefreshQueryParam } from '../common/decorators/RefreshQueryParam.decorator';
import { LoggerService } from '../logger/logger.service';
import { LegacyService } from './legacy.service';

@ApiTags('legacy')
@Controller('legacy')
export class LegacyController {
  constructor(
    private readonly legacyService: LegacyService,
    private readonly logger: LoggerService
  ) {
    this.logger.setLoggedClass(LegacyController.name);
  }

  @Get('/profile/:regionId/:realmId/:profileId')
  @ApiOperation({
    summary: 'Returns data about an individual SC2 profile',
  })
  @RefreshQueryParam()
  getProfile(
    @Param('regionId') regionId: string,
    @Param('realmId') realmId: string,
    @Param('profileId') profileId: string,
    @Query('refresh') refresh?: boolean
  ) {
    this.logger.setLoggedMethod(this.getProfile.name);

    return this.legacyService.getProfile(
      {
        regionId,
        realmId,
        profileId,
      },
      refresh
    );
  }

  @Get('/ladders/:regionId/:realmId/:profileId')
  @ApiOperation({
    summary: "Returns data about an individual SC2 profile's ladders",
  })
  @RefreshQueryParam()
  getLadders(
    @Param('regionId') regionId: string,
    @Param('realmId') realmId: string,
    @Param('profileId') profileId: string,
    @Query('refresh') refresh?: boolean
  ) {
    this.logger.setLoggedMethod(this.getLadders.name);

    return this.legacyService.getLadders(
      {
        regionId,
        realmId,
        profileId,
      },
      refresh
    );
  }

  @Get('/matches/:regionId/:realmId/:profileId')
  @ApiOperation({
    summary: "Returns data about an individual SC2 profile's match history.",
  })
  @RefreshQueryParam()
  getMatches(
    @Param('regionId') regionId: string,
    @Param('realmId') realmId: string,
    @Param('profileId') profileId: string,
    @Query('refresh') refresh?: boolean
  ) {
    this.logger.setLoggedMethod(this.getMatches.name);

    return this.legacyService.getMatches(
      {
        regionId,
        realmId,
        profileId,
      },
      refresh
    );
  }

  @Get('/ladder/:ladderId')
  @ApiOperation({
    summary: 'Returns data about an individual SC2 ladder.',
  })
  @RefreshQueryParam()
  getLadder(
    @Param('ladderId') ladderId: string,
    @Query('refresh') refresh?: boolean
  ) {
    this.logger.setLoggedMethod(this.getLadder.name);

    return this.legacyService.getLadder({ ladderId }, refresh);
  }

  @Get('/achievements/:regionId')
  @ApiOperation({
    summary: 'Returns data about the achievements available in SC2.',
  })
  @RefreshQueryParam()
  getAchievements(
    @Param('regionId') regionId: string,
    @Query('refresh') refresh?: boolean
  ) {
    this.logger.setLoggedMethod(this.getAchievements.name);

    return this.legacyService.getAchievements({ regionId }, refresh);
  }
}
