import { Source } from './Source.enum';

// TODO: convert this to DTO

export interface ApiData<T = unknown> {
  statusCode: 200;
  source: Source;
  data: T;
}
