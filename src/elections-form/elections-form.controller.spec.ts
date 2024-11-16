import { Test, TestingModule } from '@nestjs/testing';
import { ElectionsFormController } from './elections-form.controller';

describe('ElectionsFormController', () => {
  let controller: ElectionsFormController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ElectionsFormController],
    }).compile();

    controller = module.get<ElectionsFormController>(ElectionsFormController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
