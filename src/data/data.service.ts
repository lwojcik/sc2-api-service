import { Injectable } from '@nestjs/common';
import { DATA_KEYS } from '../common/constants';
import { DataBrokerService } from '../databroker/databroker.service';
import { LoggerService } from '../logger/logger.service';
import { GetLeagueDto } from './dto/get-league.dto';

@Injectable()
export class DataService {
  constructor(
    private readonly logger: LoggerService,
    private readonly dataBroker: DataBrokerService
  ) {
    this.logger.setLoggedClass(DataService.name);
  }

  getLeague(getLeagueDto: GetLeagueDto, refresh?: boolean) {
    this.logger.setLoggedMethod(this.getLeague.name);
    this.logger.debug();

    return this.dataBroker.getData({
      key: DATA_KEYS.data.getLeague,
      args: getLeagueDto,
      refresh,
    });
  }
}
