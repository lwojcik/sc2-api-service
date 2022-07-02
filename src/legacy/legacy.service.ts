import { Injectable } from '@nestjs/common';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class LegacyService {
  constructor(private readonly logger: LoggerService) {
    this.logger.setLoggedClass(LegacyService.name);
  }

  // getGrandmaster(getGrandmasterDto: GetGrandmasterDto) {
  //   this.logger.setLoggedMethod(this.getGrandmaster.name);
  //   this.logger.debug();

  //   return getGrandmasterDto;
  // }
}
