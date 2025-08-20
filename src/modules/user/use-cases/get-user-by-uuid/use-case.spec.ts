import { Test, TestingModule } from '@nestjs/testing';
import { GetUserByUuidUseCase } from './use-case';
import { IUserRepository } from '@/modules/user/repositories/protocols';
import { UserNotFoundError } from '@/shared/errors';
import { User } from '@/models';

describe('GetUserByUuidUseCase', () => {
  let useCase: GetUserByUuidUseCase;
  let userRepository: jest.Mocked<IUserRepository>;

  const mockUser: User = {
    id: 1,
  };

  const mockUserRepository = {
    findByUuid: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetUserByUuidUseCase,
        {
          provide: 'UserRepository',
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    useCase = module.get<GetUserByUuidUseCase>(GetUserByUuidUseCase);
    userRepository = module.get('UserRepository');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('execute', () => {
    const validUID = '123e4567-e89b-12d3-a456-426614174000';

    it('deve retornar o usuário quando encontrado', async () => {
      // Arrange
      userRepository.findByUuid.mockResolvedValue(mockUser);

      // Act
      const result = await useCase.execute({ uuid: validUID });

      // Assert
      expect(result.isRight()).toBe(true);
      expect(result.value).toEqual(mockUser);
      expect(userRepository.findByUuid).toHaveBeenCalledWith(validUID);
      expect(userRepository.findByUuid).toHaveBeenCalledTimes(1);
    });

    it('deve retornar UserNotFoundError quando usuário não for encontrado', async () => {
      // Arrange
      userRepository.findByUuid.mockResolvedValue(null);

      // Act
      const result = await useCase.execute({ uuid: validUID });

      // Assert
      expect(result.isLeft()).toBe(true);
      expect(result.value).toBeInstanceOf(UserNotFoundError);
      if (result.isLeft()) {
        expect(result.value.message).toBe('Usuário não encontrado.');
      }
      expect(userRepository.findByUuid).toHaveBeenCalledWith(validUID);
      expect(userRepository.findByUuid).toHaveBeenCalledTimes(1);
    });

    it('deve retornar UserNotFoundError quando usuário for undefined', async () => {
      // Arrange
      userRepository.findByUuid.mockResolvedValue(undefined);

      // Act
      const result = await useCase.execute({ uuid: validUID });

      // Assert
      expect(result.isLeft()).toBe(true);
      expect(result.value).toBeInstanceOf(UserNotFoundError);
      if (result.isLeft()) {
        expect(result.value.message).toBe('Usuário não encontrado.');
      }
      expect(userRepository.findByUuid).toHaveBeenCalledWith(validUID);
      expect(userRepository.findByUuid).toHaveBeenCalledTimes(1);
    });

    it('deve chamar o repositório com o UID correto', async () => {
      // Arrange
      const testUID = 'test-uid-123';
      userRepository.findByUuid.mockResolvedValue(mockUser);

      // Act
      await useCase.execute({ uuid: testUID });

      // Assert
      expect(userRepository.findByUuid).toHaveBeenCalledWith(testUID);
    });

    it('deve lidar com erros do repositório', async () => {
      // Arrange
      const repositoryError = new Error('Erro de banco de dados');
      userRepository.findByUuid.mockRejectedValue(repositoryError);

      // Act & Assert
      await expect(useCase.execute({ uuid: validUID })).rejects.toThrow(
        'Erro de banco de dados',
      );
      expect(userRepository.findByUuid).toHaveBeenCalledWith(validUID);
    });

    it('deve retornar usuário com propriedades corretas', async () => {
      // Arrange
      const userWithProperties: User = {
        id: 999,
      };
      userRepository.findByUuid.mockResolvedValue(userWithProperties);

      // Act
      const result = await useCase.execute({ uuid: validUID });

      // Assert
      expect(result.isRight()).toBe(true);
      expect(result.value).toEqual(userWithProperties);
      if (result.isRight()) {
        expect(result.value.id).toBe(999);
      }
    });

    it('deve funcionar com UID vazio', async () => {
      // Arrange
      const emptyUID = '';
      userRepository.findByUuid.mockResolvedValue(null);

      // Act
      const result = await useCase.execute({ uuid: emptyUID });

      // Assert
      expect(result.isLeft()).toBe(true);
      expect(result.value).toBeInstanceOf(UserNotFoundError);
      expect(userRepository.findByUuid).toHaveBeenCalledWith(emptyUID);
    });

    it('deve funcionar com uuid muito longo', async () => {
      // Arrange
      const longUID = 'a'.repeat(1000);
      userRepository.findByUuid.mockResolvedValue(mockUser);

      // Act
      const result = await useCase.execute({ uuid: longUID });

      // Assert
      expect(result.isRight()).toBe(true);
      expect(result.value).toEqual(mockUser);
      expect(userRepository.findByUuid).toHaveBeenCalledWith(longUID);
    });
  });
});
