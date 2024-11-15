import { Module } from '@nestjs/common';
import { ElectionsFormController } from './elections-form.controller';
import { ElectionsFormService } from './elections-form.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ElectionForm } from './electionsForm.entity';
import { MailService } from 'src/mail/mail.service';

@Module({
  imports: [TypeOrmModule.forFeature([ElectionForm])],
  controllers: [ElectionsFormController],
  providers: [ElectionsFormService, MailService],
})
export class ElectionsFormModule {}
