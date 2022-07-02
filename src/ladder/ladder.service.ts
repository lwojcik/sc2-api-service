import { Injectable } from '@nestjs/common';
import { LoggerService } from '../logger/logger.service';
import { GetGrandmasterDto } from './dto/get-grandmaster.dto';

@Injectable()
export class LadderService {
  constructor(private readonly logger: LoggerService) {
    this.logger.setLoggedClass(LadderService.name);
  }

  getGrandmaster(getGrandmasterDto: GetGrandmasterDto) {
    this.logger.setLoggedMethod(this.getGrandmaster.name);
    this.logger.debug();

    return getGrandmasterDto;
  }
}
