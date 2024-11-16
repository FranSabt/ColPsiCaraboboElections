import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ElectionsFormModule } from './elections-form/elections-form.module';
import { UserModule } from './user/user.module';
import { ElectionForm } from './elections-form/electionsForm.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // hace que el módulo de configuración esté disponible en toda la aplicación
    }),
    ElectionsFormModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: 'postgresql://postgres:YXVkJqsuZvjRrNbhIOGNoystnWygCFAs@postgres.railway.internal:5432/railway',
        entities: [ElectionForm],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
