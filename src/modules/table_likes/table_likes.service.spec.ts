import { Test, TestingModule } from '@nestjs/testing';
import { TableLikesService } from './table_likes.service';

describe('TableLikesService', () => {
  let service: TableLikesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TableLikesService],
    }).compile();

    service = module.get<TableLikesService>(TableLikesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
