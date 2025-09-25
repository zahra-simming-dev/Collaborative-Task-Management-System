import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { TaskService } from "../src/task/task.service";
import { Task, TaskStatus } from "../src/task/task.entity";
import { User } from "../src/auth/user.entity";

const mockTaskRepository = {
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

const mockUserRepository = {
  findOne: jest.fn(),
};

describe("TaskService", () => {
  let service: TaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        {
          provide: getRepositoryToken(Task),
          useValue: mockTaskRepository,
        },
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<TaskService>(TaskService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should create a task", async () => {
    const taskData = { title: "Test Task", description: "Test Description" };
    mockTaskRepository.create.mockReturnValue(taskData);
    mockTaskRepository.save.mockReturnValue({ id: 1, ...taskData });

    const result = await service.create(taskData.title, taskData.description);
    expect(mockTaskRepository.create).toHaveBeenCalledWith(taskData);
    expect(mockTaskRepository.save).toHaveBeenCalled();
  });
});
