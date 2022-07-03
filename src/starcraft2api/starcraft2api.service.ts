import { Injectable } from '@nestjs/common';
import { StarCraft2API } from 'starcraft2-api';
import { SC2API_METHOD_MAPPINGS } from '../common/constants';
import { Sc2DataKey } from '../common/types';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class StarCraft2ApiService {
  private starcraft2api: StarCraft2API;

  constructor(private readonly logger: LoggerService) {
    this.logger.setLoggedClass(StarCraft2ApiService.name);

    this.starcraft2api = new StarCraft2API({
      region: 'us',
      clientId: 'a',
      clientSecret: 'a',
    });
  }

  get(key: string, args: unknown) {
    this.logger.setLoggedMethod(this.get.name, { key, args });
    this.logger.debug();

    if (!Object.values(Sc2DataKey).includes(key as Sc2DataKey)) {
      throw new RangeError(
        `'${key}' does not exist as a value in Sc2DataKey enum.`
      );
    }

    const sc2ApiMethod = SC2API_METHOD_MAPPINGS[key];
    console.log(sc2ApiMethod);
    console.log(args);

    return { key, args };
  }
}
