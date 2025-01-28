import { Test, TestingModule } from '@nestjs/testing';
import { GuestLikesController } from './guest_likes.controller';
import { GuestLikesService } from './guest_likes.service';

describe('GuestLikesController', () => {
  let controller: GuestLikesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GuestLikesController],
      providers: [GuestLikesService],
    }).compile();

    controller = module.get<GuestLikesController>(GuestLikesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
