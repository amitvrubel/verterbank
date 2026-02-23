import { Test, TestingModule } from '@nestjs/testing';
import { LexemesController } from './lexemes.controller';

describe('LexemesController', () => {
  let controller: LexemesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LexemesController],
    }).compile();

    controller = module.get<LexemesController>(LexemesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
