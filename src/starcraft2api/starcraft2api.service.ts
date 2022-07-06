import { Inject, Injectable, Scope } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { RequestContext } from 'nestjs-request-context';
import { StarCraft2API } from 'starcraft2-api';
import { battleNetConfig } from '../config';
import { SC2API_METHOD_MAPPINGS } from '../common/constants';
import {
  ApiData,
  ApiErrorCode,
  Sc2DataKey,
  StarCraft2APILibrary,
} from '../common/types';
import { LoggerService } from '../logger/logger.service';
import { BattleNetError } from '../common/dto/battlenet-error.dto';
import { BasService } from '../bas/bas.service';

@Injectable({ scope: Scope.REQUEST })
export class StarCraft2ApiService {
  private starcraft2api: StarCraft2API;

  private accessToken: string;

  constructor(
    @Inject(battleNetConfig.KEY)
    private readonly battleNetConf: ConfigType<typeof battleNetConfig>,
    private readonly basService: BasService,
    private readonly logger: LoggerService
  ) {}

  async setupSc2Api() {
    const accessToken = await this.basService.getAccessToken();
    this.accessToken = accessToken;

    this.starcraft2api = new StarCraft2API({
      region: this.battleNetConf.region,
      clientId: this.battleNetConf.clientId,
      clientSecret: this.battleNetConf.clientSecret,
      accessToken: this.accessToken, // await this.basService.getAccessToken()?
      timeoutMs: this.battleNetConf.timeoutMs,
      refreshExpiredAccessToken: true,
      onAccessTokenRefresh: (newAccessToken) => {
        this.accessToken = newAccessToken;
      },
    });
  }

  async get<T = unknown>(key: string, args: unknown) {
    try {
      if (!Object.values(Sc2DataKey).includes(key as Sc2DataKey)) {
        throw new RangeError(
          `'${key}' does not exist as a value in Sc2DataKey enum.`
        );
      }

      await this.setupSc2Api();

      const sc2ApiMethod = SC2API_METHOD_MAPPINGS[key] as string;
      const data = await (
        this.starcraft2api as unknown as StarCraft2APILibrary
      )[sc2ApiMethod](args);

      return {
        statusCode: 200,
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
