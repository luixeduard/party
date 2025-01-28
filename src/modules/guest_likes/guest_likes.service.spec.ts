import { Test, TestingModule } from '@nestjs/testing';
import { GuestLikesService } from './guest_likes.service';

describe('GuestLikesService', () => {
  let service: GuestLikesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GuestLikesService],
    }).compile();

    service = module.get<GuestLikesService>(GuestLikesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
