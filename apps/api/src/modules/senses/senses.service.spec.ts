import { Test, TestingModule } from '@nestjs/testing';
import { SensesService } from './senses.service';

describe('SensesService', () => {
  let service: SensesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SensesService],
    }).compile();

    service = module.get<SensesService>(SensesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
