import { ApiProperty } from '@nestjs/swagger';

export class ProfileDto {
  @ApiProperty({
    description: 'Region id',
  })
  regionId: string;

  @ApiProperty({
    description: 'Realm id',
  })
  realmId: string;

  @ApiProperty({
    description: 'Profile id',
  })
  profileId: string;
}
