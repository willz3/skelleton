import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ok } from '@core/infra/http';
import { IGetUserByUuidController, IGetUserByUuidUseCase } from './types';
import { badRequest } from '@/core/infra/http/http-response';

@ApiTags('User')
@Controller('user')
export class GetUserByUuidController implements IGetUserByUuidController {
  constructor(
    @Inject('GetUserByUuidUseCase')
    private readonly getUserByUuidUseCase: IGetUserByUuidUseCase,
  ) {}

  @Get(':uuid')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Buscar usuário por UUID' })
  @ApiResponse({
    status: 200,
    description: 'Usuário retornado com sucesso.',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'number' },
        },
      },
    },
  })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  async handle(@Param('uuid') uuid: string) {
    const result = await this.getUserByUuidUseCase.execute({ uuid });

    if (result.isLeft()) {
      return badRequest([result.value]);
    }

    return ok(result.value);
  }
}
