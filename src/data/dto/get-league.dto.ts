import { ApiProperty } from '@nestjs/swagger';

export class GetLeagueDto {
  @ApiProperty({
    description: `Season id`,
  })
  seasonId: string;

  @ApiProperty({
    description: `Queue id`,
  })
  queueId: string;

  @ApiProperty({
    description: `Team type`,
  })
  teamType: string;

  @ApiProperty({
    description: `League id`,
  })
  leagueId: string;
}
