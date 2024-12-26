import { Test, TestingModule } from '@nestjs/testing';
import { ShorturlController } from './shorturl.controller';
import { ShorturlService } from './shorturl.service';

describe('ShorturlController', () => {
  let controller: ShorturlController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShorturlController],
      providers: [ShorturlService],
    }).compile();

    controller = module.get<ShorturlController>(ShorturlController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
