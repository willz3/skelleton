import { Test, TestingModule } from '@nestjs/testing';
import { GetUserByUuidController } from './controller';
import { IGetUserByUuidUseCase } from './types';
import { User } from '@/models';
import { right, left } from '@core/shared/logic/either';
import { UserNotFoundError } from '@/shared/errors';
import { ok } from '@/core/infra/http';
import { badRequest } from '@/core/infra/http/http-response';

describe('GetUserByUuidController', () => {
  let controller: GetUserByUuidController;
  let getUserByUuidUseCase: jest.Mocked<IGetUserByUuidUseCase>;

  const mockUser: User = {
    id: 1,
  };

  const mockGetUserByUuidUseCase = {
    execute: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetUserByUuidController],
      providers: [
        {
          provide: 'GetUserByUuidUseCase',
          useValue: mockGetUserByUuidUseCase,
        },
      ],
    }).compile();

    controller = module.get<GetUserByUuidController>(GetUserByUuidController);
    getUserByUuidUseCase = module.get('GetUserByUuidUseCase');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('handle', () => {
    const validUID = '123e4567-e89b-12d3-a456-426614174000';

    it('deve retornar usuário com sucesso quando encontrado', async () => {
      // Arrange
      getUserByUuidUseCase.execute.mockResolvedValue(right(mockUser));

      // Act
      const result = await controller.handle(validUID);

      // Assert
      expect(result).toEqual(ok(mockUser));
      expect(getUserByUuidUseCase.execute).toHaveBeenCalledWith({
        uuid: validUID,
      });
      expect(getUserByUuidUseCase.execute).toHaveBeenCalledTimes(1);
    });

    it('deve retornar erro quando usuário não for encontrado', async () => {
      // Arrange
      const userNotFoundError = new UserNotFoundError();
      getUserByUuidUseCase.execute.mockResolvedValue(left(userNotFoundError));

      // Act
      const result = await controller.handle(validUID);

      // Assert
      expect(result).toEqual(badRequest([userNotFoundError]));
      expect(getUserByUuidUseCase.execute).toHaveBeenCalledWith({
        uuid: validUID,
      });
      expect(getUserByUuidUseCase.execute).toHaveBeenCalledTimes(1);
    });

    it('deve chamar o use case com o UID correto', async () => {
      // Arrange
      const testUID = 'test-uid-123';
      getUserByUuidUseCase.execute.mockResolvedValue(right(mockUser));

      // Act
      await controller.handle(testUID);

      // Assert
      expect(getUserByUuidUseCase.execute).toHaveBeenCalledWith({
        uuid: testUID,
      });
    });

    it('deve funcionar com UID vazio', async () => {
      // Arrange
      const emptyUID = '';
      const userNotFoundError = new UserNotFoundError();
      getUserByUuidUseCase.execute.mockResolvedValue(left(userNotFoundError));

      // Act
      const result = await controller.handle(emptyUID);

      // Assert
      expect(result).toEqual(badRequest([userNotFoundError]));
      expect(getUserByUuidUseCase.execute).toHaveBeenCalledWith({
        uuid: emptyUID,
      });
    });

    it('deve funcionar com UID muito longo', async () => {
      // Arrange
      const longUID = 'a'.repeat(1000);
      getUserByUuidUseCase.execute.mockResolvedValue(right(mockUser));

      // Act
      const result = await controller.handle(longUID);

      // Assert
      expect(result).toEqual(ok(mockUser));
      expect(getUserByUuidUseCase.execute).toHaveBeenCalledWith({
        uuid: longUID,
      });
    });

    it('deve lidar com diferentes tipos de usuários', async () => {
      // Arrange
      const differentUser: User = {
        id: 999,
      };
      getUserByUuidUseCase.execute.mockResolvedValue(right(differentUser));

      // Act
      const result = await controller.handle(validUID);

      // Assert
      expect(result).toEqual(ok(differentUser));
    });

    it('deve lidar com erros genéricos do use case', async () => {
      // Arrange
      const genericError = new Error('Erro genérico');
      getUserByUuidUseCase.execute.mockResolvedValue(left(genericError));

      // Act
      const result = await controller.handle(validUID);

      // Assert
      expect(result).toEqual(badRequest([genericError]));
      expect(getUserByUuidUseCase.execute).toHaveBeenCalledWith({
        uuid: validUID,
      });
    });

    it('deve manter a estrutura de resposta consistente', async () => {
      // Arrange
      getUserByUuidUseCase.execute.mockResolvedValue(right(mockUser));

      // Act
      const result = await controller.handle(validUID);

      // Assert
      expect(result).toEqual(ok(mockUser));
    });

    it('deve manter a estrutura de erro consistente', async () => {
      // Arrange
      const error = new UserNotFoundError();
      getUserByUuidUseCase.execute.mockResolvedValue(left(error));

      // Act
      const result = await controller.handle(validUID);

      // Assert
      expect(result).toEqual(badRequest([error]));
    });
  });
});
