import { Test, TestingModule } from '@nestjs/testing';
import { HeadwordsService } from './headwords.service';

describe('HeadwordsService', () => {
  let service: HeadwordsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HeadwordsService],
    }).compile();

    service = module.get<HeadwordsService>(HeadwordsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
