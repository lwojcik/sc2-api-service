import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { basConfig } from '../config/bas.config';

@Injectable()
export class BasService {
  constructor(
    @Inject(basConfig.KEY)
    private readonly basConf: ConfigType<typeof basConfig>,
    private readonly httpService: HttpService
  ) {}

  async getAccessToken(refresh?: boolean) {
    const accessToken = await this.httpService.axiosRef.get<{
      accessToken: string;
    }>(`${this.basConf.url}/accesstoken${refresh ? '?refresh=true' : ''}`);
    return accessToken.data.accessToken;
  }
}
