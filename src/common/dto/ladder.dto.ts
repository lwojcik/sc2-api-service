import { ApiProperty } from '@nestjs/swagger';

export class LadderDto {
  @ApiProperty({
    description: 'Ladder id',
  })
  ladderId: string;
}
