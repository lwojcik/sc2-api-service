import { Controller, Get } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiTooManyRequestsResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ApiResponse } from '../common/types';
import { StatusResponse } from './dto/status-response.dto';
import { StatusService } from './status.service';
import { TooManyRequestsError } from '../common/dto/too-many-requests-error.dto';
import { UnauthorizedError } from '../common/dto/unauthorized-error.dto';

@ApiTags('status')
@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Get()
  @ApiOperation({ summary: 'Check app health and uptime' })
  @ApiOkResponse({
    description: ApiResponse.ok,
    type: StatusResponse,
  })
  @ApiBadRequestResponse({
    description: ApiResponse.badRequest,
  })
  @ApiUnauthorizedResponse({
    description: ApiResponse.unauthorized,
    type: UnauthorizedError,
  })
  @ApiTooManyRequestsResponse({
    description: ApiResponse.tooManyRequests,
    type: TooManyRequestsError,
  })
  getStatus() {
    return this.statusService.getStatus();
  }
}
