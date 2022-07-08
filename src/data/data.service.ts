import { Injectable } from '@nestjs/common';
import { DATA_KEYS } from '../common/constants';
import { DataBrokerService } from '../databroker/databroker.service';
import { GetLeagueDto } from './dto/get-league.dto';

@Injectable()
export class DataService {
  constructor(private readonly dataBroker: DataBrokerService) {}

  getLeague(getLeagueDto: GetLeagueDto, refresh?: boolean) {
    return this.dataBroker.getData({
      key: DATA_KEYS.data.getLeague,
      args: getLeagueDto,
      refresh,
    });
  }
}
