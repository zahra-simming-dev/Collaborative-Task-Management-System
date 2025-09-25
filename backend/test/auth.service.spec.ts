import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { JwtService } from "@nestjs/jwt";
import { AuthService } from "../src/auth/auth.service";
import { User, UserRole } from "../src/auth/user.entity";

const mockRepository = {
  create: jest.fn(),
  save: jest.fn(),
  findOne: jest.fn(),
};

const mockJwtService = {
  sign: jest.fn(),
};

describe("AuthService", () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should register a user", async () => {
    const userData = {
      email: "test@test.com",
      password: "password",
      name: "Test User",
    };
    mockRepository.create.mockReturnValue(userData);
    mockRepository.save.mockReturnValue({ id: 1, ...userData });

    const result = await service.register(
      userData.email,
      userData.password,
      userData.name
    );
    expect(mockRepository.create).toHaveBeenCalled();
    expect(mockRepository.save).toHaveBeenCalled();
  });
});
