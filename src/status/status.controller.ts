import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { StatusService } from './status.service';
import { UseCommonErrorResponses } from '../common/decorators/common-error-responses.decorator';

@ApiTags('status')
@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Get()
  @ApiOperation({ summary: 'Check app health and uptime' })
  @ApiOkResponse({
    description: 'ok',
  })
  @UseCommonErrorResponses()
  getStatus() {
    return this.statusService.getStatus();
  }
}
