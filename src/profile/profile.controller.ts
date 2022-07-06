import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RefreshQueryParam } from '../common/decorators/RefreshQueryParam.decorator';
import { ProfileService } from './profile.service';

@ApiTags('profile')
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get('/static/:regionId')
  @ApiOperation({
    summary:
      'Returns all static SC2 profile data (achievements, categories, criteria, and rewards).',
  })
  @RefreshQueryParam()
  getStatic(
    @Param('regionId') regionId: string,
    @Query('refresh') refresh?: boolean
  ) {
    return this.profileService.getStatic({ regionId }, refresh);
  }

  @Get('/metadata/:regionId/:realmId/:profileId')
  @ApiOperation({
    summary: "Returns metadata for an individual's profile.",
  })
  @RefreshQueryParam()
  getMetadata(
    @Param('regionId') regionId: string,
    @Param('realmId') realmId: string,
    @Param('profileId') profileId: string,
    @Query('refresh') refresh?: boolean
  ) {
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
  @RefreshQueryParam()
  getProfile(
    @Param('regionId') regionId: string,
    @Param('realmId') realmId: string,
    @Param('profileId') profileId: string,
    @Query('refresh') refresh?: boolean
  ) {
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
  @RefreshQueryParam()
  getLadderSummary(
    @Param('regionId') regionId: string,
    @Param('realmId') realmId: string,
    @Param('profileId') profileId: string,
    @Query('refresh') refresh?: boolean
  ) {
    return this.profileService.getLadderSummary(
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
  @RefreshQueryParam()
  getPlayerLadder(
    @Param('regionId') regionId: string,
    @Param('realmId') realmId: string,
    @Param('profileId') profileId: string,
    @Param('ladderId') ladderId: string,
    @Query('refresh') refresh?: boolean
  ) {
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
