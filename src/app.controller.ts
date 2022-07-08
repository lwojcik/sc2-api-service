import { Controller, Get } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiTooManyRequestsResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ApiResponse } from './common/types';
import { MainResponse } from './main/dto/main-response.dto';
import { MainService } from './main/main.service';
import { TooManyRequestsError } from './common/dto/too-many-requests-error.dto';

@ApiTags('main')
@Controller()
export class AppController {
  constructor(private readonly mainService: MainService) {}

  @Get()
  @ApiOperation({ summary: 'App name and list of available endpoints' })
  @ApiOkResponse({
    description: ApiResponse.ok,
    type: MainResponse,
  })
  @ApiBadRequestResponse({
    description: ApiResponse.badRequest,
  })
  @ApiUnauthorizedResponse({
    description: ApiResponse.unauthorized,
  })
  @ApiTooManyRequestsResponse({
    description: ApiResponse.tooManyRequests,
    type: TooManyRequestsError,
  })
  getMain() {
    return this.mainService.getMain();
  }
}
