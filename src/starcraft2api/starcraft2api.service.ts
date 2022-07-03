import { Injectable } from '@nestjs/common';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class StarCraft2ApiService {
  constructor(private readonly logger: LoggerService) {
    this.logger.setLoggedClass(StarCraft2ApiService.name);
  }

  get(key: string, args: unknown) {
    this.logger.setLoggedMethod(this.get.name, { key, args });

    return { key, args };
  }
}
