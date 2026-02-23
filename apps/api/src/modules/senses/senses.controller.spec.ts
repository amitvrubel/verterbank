import { Test, TestingModule } from '@nestjs/testing';
import { SensesController } from './senses.controller';

describe('SensesController', () => {
  let controller: SensesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SensesController],
    }).compile();

    controller = module.get<SensesController>(SensesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
