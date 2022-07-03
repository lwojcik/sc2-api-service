import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoggerService } from '../logger/logger.service';
import { ProfileService } from './profile.service';

@ApiTags('profile')
@Controller('profile')
export class ProfileController {
  constructor(
    private readonly profileService: ProfileService,
    private readonly logger: LoggerService
  ) {
    this.logger.setLoggedClass(ProfileController.name);
  }

  @Get('/static/:regionId')
  @ApiOperation({
    summary:
      'Returns all static SC2 profile data (achievements, categories, criteria, and rewards).',
  })
  getStatic(
    @Param('regionId') regionId: string,
    @Query('refresh') refresh?: boolean
  ) {
    this.logger.setLoggedMethod(this.getStatic.name);
    this.logger.debug();

    return this.profileService.getStatic({ regionId }, refresh);
  }

  @Get('/metadata/:regionId/:realmId/:profileId')
  @ApiOperation({
    summary: "Returns metadata for an individual's profile.",
  })
  getMetadata(
    @Param('regionId') regionId: string,
    @Param('realmId') realmId: string,
    @Param('profileId') profileId: string,
    @Query('refresh') refresh?: boolean
  ) {
    this.logger.setLoggedMethod(this.getMetadata.name);
    this.logger.debug();

    return this.profileService.getMetadata(
      {
        regionId,
        realmId,
        profileId,
      },
      refresh
    );
  }

  @Get('/profile/:regionId/:realmId/:profileId')
  @ApiOperation({
    summary: 'Returns data about an individual SC2 profile.',
  })
  getProfile(
    @Param('regionId') regionId: string,
    @Param('realmId') realmId: string,
    @Param('profileId') profileId: string,
    @Query('refresh') refresh?: boolean
  ) {
    this.logger.setLoggedMethod(this.getProfile.name);
    this.logger.debug();

    return this.profileService.getProfile(
      {
        regionId,
        realmId,
        profileId,
      },
      refresh
    );
  }

  @Get('/laddersummary/:regionId/:realmId/:profileId')
  @ApiOperation({
    summary: 'Returns a ladder summary for an individual SC2 profile.',
  })
  getLadderSummary(
    @Param('regionId') regionId: string,
    @Param('realmId') realmId: string,
    @Param('profileId') profileId: string,
    @Query('refresh') refresh?: boolean
  ) {
    this.logger.setLoggedMethod(this.getLadderSummary.name);
    this.logger.debug();

    return this.profileService[this.getLadderSummary.name](
      {
        regionId,
        realmId,
        profileId,
      },
      refresh
    );
  }

  @Get('/ladder/:regionId/:realmId/:profileId/:ladderId')
  @ApiOperation({
    summary: "Returns data about an individual profile's ladder.",
  })
  getPlayerLadder(
    @Param('regionId') regionId: string,
    @Param('realmId') realmId: string,
    @Param('profileId') profileId: string,
    @Param('ladderId') ladderId: string,
    @Query('refresh') refresh?: boolean
  ) {
    this.logger.setLoggedMethod(this.getPlayerLadder.name);
    this.logger.debug();

    return this.profileService.getPlayerLadder(
      {
        regionId,
        realmId,
        profileId,
        ladderId,
      },
      refresh
    );
  }
}
