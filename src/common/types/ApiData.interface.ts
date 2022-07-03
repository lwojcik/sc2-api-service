import { Source } from './Source.enum';

export interface ApiData<T = unknown> {
  statusCode: 200;
  source: Source;
  data: T;
}
