// TODO: convert this to DTO

export interface ApiData<T = unknown> {
  statusCode: 200;
  data: T;
}
