import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('legacy')
@Controller('legacy')
export class LegacyController {}
