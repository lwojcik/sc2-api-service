import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { RequestContext } from 'nestjs-request-context';
import { PlayerObject, StarCraft2API } from 'starcraft2-api';
import { battleNetConfig } from '../config';
import { SC2API_METHOD_MAPPINGS } from '../common/constants';
import { ApiData, ApiErrorCode, Sc2DataKey } from '../common/types';
import { LoggerService } from '../logger/logger.service';
import { BattleNetError } from '../common/dto/battlenet-error.dto';
import { BasService } from '../bas/bas.service';

interface PlayerLadderObject extends PlayerObject {
  ladderId: string;
}

@Injectable()
export class StarCraft2ApiService {
  private starcraft2api: StarCraft2API;

  private accessToken: string;

  constructor(
    @Inject(battleNetConfig.KEY)
    private readonly battleNetConf: ConfigType<typeof battleNetConfig>,
    private readonly basService: BasService,
    private readonly logger: LoggerService
  ) {}

  private refreshAccessToken(newAccessToken: string) {
    this.accessToken = newAccessToken;
  }

  private async setupSc2Api() {
    this.starcraft2api = new StarCraft2API({
      region: this.battleNetConf.region,
      clientId: this.battleNetConf.clientId,
      clientSecret: this.battleNetConf.clientSecret,
      accessToken: await this.basService.getAccessToken(),
      timeoutMs: this.battleNetConf.timeoutMs,
      refreshExpiredAccessToken: true,
      onAccessTokenRefresh: (newAccessToken) => {
        this.refreshAccessToken(newAccessToken);
      },
    });
  }

  async get<T = unknown>(key: Sc2DataKey, args: unknown) {
    try {
      if (!Object.values(Sc2DataKey).includes(key as Sc2DataKey)) {
        throw new RangeError(
          `'${key}' does not exist as a value in Sc2DataKey enum.`
        );
      }

      await this.setupSc2Api();

      const sc2ApiMethod = SC2API_METHOD_MAPPINGS[key] as string;

      if (sc2ApiMethod === 'queryPlayerLadder') {
        const playerLadderdata = await this.starcraft2api.queryPlayerLadder(
          {
            regionId: (args as PlayerLadderObject).regionId,
            realmId: (args as PlayerLadderObject).realmId,
            profileId: (args as PlayerLadderObject).profileId,
          },
          (args as PlayerLadderObject).ladderId
        );
        return {
          statusCode: 200,
          data: playerLadderdata,
        } as unknown as ApiData<T>;
      }

      const data = await (
        this.starcraft2api as unknown as {
          [key: string]: (args?: unknown) => unknown;
        }
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
