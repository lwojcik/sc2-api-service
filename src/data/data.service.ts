import { Injectable } from '@nestjs/common';
import { LoggerService } from '../logger/logger.service';
import { GetLeagueDto } from './dto/get-league.dto';

@Injectable()
export class DataService {
  constructor(private readonly logger: LoggerService) {
    this.logger.setLoggedClass(DataService.name);
  }

  getLeague(getLeagueDto: GetLeagueDto) {
    this.logger.setLoggedMethod(this.getLeague.name);
    this.logger.debug();

    return getLeagueDto;
  }
}
