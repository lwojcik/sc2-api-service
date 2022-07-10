import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiResponse } from '../common/types';
import { RefreshQueryParam } from '../common/decorators/RefreshQueryParam.decorator';
import { LegacyService } from './legacy.service';
import { UseCommonErrorResponses } from '../common/decorators/common-error-responses.decorator';

@ApiTags('legacy')
@Controller('legacy')
export class LegacyController {
  constructor(private readonly legacyService: LegacyService) {}

  @Get('/profile/:regionId/:realmId/:profileId')
  @ApiOperation({
    summary: 'Returns data about an individual SC2 profile',
  })
  @ApiOkResponse({
    description: ApiResponse.ok,
  })
  @UseCommonErrorResponses()
  @RefreshQueryParam()
  getProfile(
    @Param('regionId') regionId: string,
    @Param('realmId') realmId: string,
    @Param('profileId') profileId: string,
    @Query('refresh') refresh?: boolean
  ) {
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
  @ApiOkResponse()
  @UseCommonErrorResponses()
  @RefreshQueryParam()
  getLadders(
    @Param('regionId') regionId: string,
    @Param('realmId') realmId: string,
    @Param('profileId') profileId: string,
    @Query('refresh') refresh?: boolean
  ) {
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
  @ApiOkResponse({
    description: ApiResponse.ok,
  })
  @UseCommonErrorResponses()
  @RefreshQueryParam()
  getMatches(
    @Param('regionId') regionId: string,
    @Param('realmId') realmId: string,
    @Param('profileId') profileId: string,
    @Query('refresh') refresh?: boolean
  ) {
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
  @ApiOkResponse()
  @UseCommonErrorResponses()
  @RefreshQueryParam()
  getLadder(
    @Param('ladderId') ladderId: string,
    @Query('refresh') refresh?: boolean
  ) {
    return this.legacyService.getLadder({ ladderId }, refresh);
  }

  @Get('/achievements/:regionId')
  @ApiOperation({
    summary: 'Returns data about the achievements available in SC2.',
  })
  @ApiOkResponse({
    description: ApiResponse.ok,
  })
  @UseCommonErrorResponses()
  @RefreshQueryParam()
  getAchievements(
    @Param('regionId') regionId: string,
    @Query('refresh') refresh?: boolean
  ) {
    return this.legacyService.getAchievements({ regionId }, refresh);
  }
}
