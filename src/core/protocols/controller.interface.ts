import { IHttpResponse } from '@core/infra/http';

export interface IController<DTO> {
  handle(dto: DTO, req?: any, res?: any): Promise<IHttpResponse | any>;
}
