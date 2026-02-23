import { Test, TestingModule } from '@nestjs/testing';
import { LexemesService } from './lexemes.service';

describe('LexemesService', () => {
  let service: LexemesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LexemesService],
    }).compile();

    service = module.get<LexemesService>(LexemesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
