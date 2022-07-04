import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { basConfig } from '../config/bas.config';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class BasService {
  constructor(
    @Inject(basConfig.KEY)
    private readonly basConf: ConfigType<typeof basConfig>,
    private readonly httpService: HttpService,
    private readonly logger: LoggerService
  ) {
    this.logger.setLoggedClass(BasService.name);
  }

  getAccessToken() {
    return this.httpService.axiosRef.get<string>(
      `${this.basConf.url}/accesstoken`
    );
  }
}
