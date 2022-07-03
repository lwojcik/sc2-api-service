import { ApiProperty } from '@nestjs/swagger';

export class GetLeagueDto {
  @ApiProperty({
    description: `Season id`,
  })
  seasonId: number;

  @ApiProperty({
    description: `Queue id`,
  })
  queueId: number;

  @ApiProperty({
    description: `Team type`,
  })
  teamType: number;

  @ApiProperty({
    description: `League id`,
  })
  leagueId: number;
}
