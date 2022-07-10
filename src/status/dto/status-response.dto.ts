import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class StatusResponse {
  @ApiProperty({
    description: 'Application status',
  })
  @IsString()
  status: string;

  @ApiProperty({
    description: 'Application uptime',
  })
  @IsString()
  uptime: string;

  @ApiProperty({
    description: 'Timestamp of request completion',
  })
  @IsString()
  timestamp: string;
}
