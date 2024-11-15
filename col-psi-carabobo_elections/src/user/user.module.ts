import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MailModule } from 'src/mail/mail.module';
import { ElectionsFormModule } from 'src/elections-form/elections-form.module';

@Module({
  imports: [MailModule, ElectionsFormModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
