import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';
import { ApiErrorCode, BattleNetErrorCode } from '../types';

export class BattleNetError {
  @ApiProperty({
    description:
      'Error code used to denote the issue was caused by Battle.net API',
    example: ApiErrorCode.bnetApiError,
  })
  error: ApiErrorCode;

  @ApiProperty({
    description: 'Error code (numerical or string)',
    examples: [401, 'ECONNREFUSED'],
  })
  statusCode: HttpStatus | BattleNetErrorCode;

  @ApiProperty({
    description: 'Error message',
    example: 'Request failed with status code 401',
  })
  @IsString()
  message: string;

  @ApiProperty({
    description: 'Request id saved in error logs (UUID v4)',
    example: '6bc-043d-4d58-b28b-72a6605dcf78',
  })
  @IsUUID(4)
  id: string;
}
