import { Test, TestingModule } from '@nestjs/testing';
import { ElectionsFormService } from './elections-form.service';

describe('ElectionsFormService', () => {
  let service: ElectionsFormService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ElectionsFormService],
    }).compile();

    service = module.get<ElectionsFormService>(ElectionsFormService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
