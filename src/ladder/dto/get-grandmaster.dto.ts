import { ApiProperty } from '@nestjs/swagger';

export class GetGrandmasterDto {
  @ApiProperty({
    description: `Region id`,
  })
  regionId: string;
}
