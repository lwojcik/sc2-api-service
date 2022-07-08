import { Sc2DataKey } from '../../common/types';

export class GetDataDto {
  key: Sc2DataKey;

  args: unknown;

  refresh?: boolean;
}
