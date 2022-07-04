import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from '../logger/logger.module';
import { basConfig } from '../config/bas.config';
import { BasService } from './bas.service';

@Module({
  imports: [
    ConfigModule.forFeature(basConfig),
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    LoggerModule,
  ],
  providers: [BasService],
  exports: [BasService],
})
export class BasModule {}
