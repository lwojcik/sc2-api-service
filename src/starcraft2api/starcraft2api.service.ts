import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { RequestContext } from 'nestjs-request-context';
import { StarCraft2API } from 'starcraft2-api';
import { battleNetConfig } from '../config';
import { SC2API_METHOD_MAPPINGS } from '../common/constants';
import { ApiData, ApiErrorCode, Sc2DataKey, Source } from '../common/types';
import { LoggerService } from '../logger/logger.service';
import { BattleNetError } from '../common/dto/battlenet-error.dto';

@Injectable()
export class StarCraft2ApiService {
  private starcraft2api: StarCraft2API;

  constructor(
    @Inject(battleNetConfig.KEY)
    private readonly battleNetConf: ConfigType<typeof battleNetConfig>,
    private readonly logger: LoggerService
  ) {
    this.logger.setLoggedClass(StarCraft2ApiService.name);

    this.starcraft2api = new StarCraft2API({
      region: this.battleNetConf.region,
      clientId: this.battleNetConf.clientId,
      clientSecret: this.battleNetConf.clientSecret,
      timeoutMs: this.battleNetConf.timeoutMs,
    });
  }

  async get<T = unknown>(key: string, args: unknown) {
    try {
      this.logger.setLoggedMethod(this.get.name, { key, args });
      this.logger.debug();

      if (!Object.values(Sc2DataKey).includes(key as Sc2DataKey)) {
        throw new RangeError(
          `'${key}' does not exist as a value in Sc2DataKey enum.`
        );
      }

      const sc2ApiMethod = SC2API_METHOD_MAPPINGS[key] as string;
      const data = await this.starcraft2api[sc2ApiMethod](args);

      return {
        statusCode: 200,
        source: Source.battlenet,
        data,
      } as ApiData<T>;
    } catch (error) {
      this.logger.error(error);

      return {
        error: ApiErrorCode.bnetApiError,
        statusCode: error.response?.status || error?.code || 500,
        message:
          error.response?.statusText ||
          error?.message ||
          'SAS internal server error',
        id: RequestContext.currentContext.req.id,
      } as BattleNetError;
    }
  }
}
