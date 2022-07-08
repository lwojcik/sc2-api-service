import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiResponse } from '../common/types';
import { StatusService } from './status.service';
import { UseCommonErrorResponses } from '../common/decorators/common-error-responses.decorator';

@ApiTags('status')
@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Get()
  @ApiOperation({ summary: 'Check app health and uptime' })
  @ApiOkResponse({
    description: ApiResponse.ok,
  })
  @UseCommonErrorResponses()
  getStatus() {
    return this.statusService.getStatus();
  }
}
