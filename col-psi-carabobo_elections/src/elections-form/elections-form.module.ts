import { Module } from '@nestjs/common';
import { ElectionsFormController } from './elections-form.controller';
import { ElectionsFormService } from './elections-form.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ElectionForm } from './electionsForm.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ElectionForm])],
  controllers: [ElectionsFormController],
  providers: [ElectionsFormService],
})
export class ElectionsFormModule {}
