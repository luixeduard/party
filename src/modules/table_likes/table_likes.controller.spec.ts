import { Test, TestingModule } from '@nestjs/testing';
import { TableLikesController } from './table_likes.controller';
import { TableLikesService } from './table_likes.service';

describe('TableLikesController', () => {
  let controller: TableLikesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TableLikesController],
      providers: [TableLikesService],
    }).compile();

    controller = module.get<TableLikesController>(TableLikesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
