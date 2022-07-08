import { ApiProperty } from '@nestjs/swagger';

export class RegionDto {
  @ApiProperty({
    description: 'Region id',
  })
  regionId: string;
}
