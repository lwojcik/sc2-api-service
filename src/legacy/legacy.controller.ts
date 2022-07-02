import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
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
  getProfile(
    @Param('regionId') regionId: string,
    @Param('realmId') realmId: string,
    @Param('profileId') profileId: string
  ) {
    this.logger.setLoggedMethod(this.getProfile.name);

    return this.legacyService.getProfile({
      regionId,
      realmId,
      profileId,
    });
  }

  @Get('/ladders/:regionId/:realmId/:profileId')
  @ApiOperation({
    summary: "Returns data about an individual SC2 profile's ladders",
  })
  getLadders(
    @Param('regionId') regionId: string,
    @Param('realmId') realmId: string,
    @Param('profileId') profileId: string
  ) {
    this.logger.setLoggedMethod(this.getLadders.name);

    return this.legacyService.getLadders({
      regionId,
      realmId,
      profileId,
    });
  }

  @Get('/matches/:regionId/:realmId/:profileId')
  @ApiOperation({
    summary: "Returns data about an individual SC2 profile's match history.",
  })
  getMatches(
    @Param('regionId') regionId: string,
    @Param('realmId') realmId: string,
    @Param('profileId') profileId: string
  ) {
    this.logger.setLoggedMethod(this.getMatches.name);

    return this.legacyService.getMatches({
      regionId,
      realmId,
      profileId,
    });
  }

  @Get('/ladder/:ladderId')
  @ApiOperation({
    summary: 'Returns data about an individual SC2 ladder.',
  })
  getLadder(@Param('ladderId') ladderId: string) {
    this.logger.setLoggedMethod(this.getLadder.name);

    return this.legacyService.getLadder({ ladderId });
  }

  @Get('/achievements/:regionId')
  @ApiOperation({
    summary: 'Returns data about the achievements available in SC2.',
  })
  getAchievements(@Param('regionId') regionId: string) {
    this.logger.setLoggedMethod(this.getAchievements.name);

    return this.legacyService.getAchievements({ regionId });
  }
}
