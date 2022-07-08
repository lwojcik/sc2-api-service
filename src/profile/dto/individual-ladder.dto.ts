import { Mixin } from 'ts-mixer';
import { ProfileDto } from '../../common/dto/profile.dto';
import { LadderDto } from '../../common/dto/ladder.dto';

export class IndividualLadderDto extends Mixin(ProfileDto, LadderDto) {}
