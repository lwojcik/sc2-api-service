import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { StatusModule } from './status/status.module';
import { MainModule } from './main/main.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard, PassthroughGuard } from './auth/guards';
import { ProfileModule } from './profile/profile.module';
import { LadderModule } from './ladder/ladder.module';
import { DataModule } from './data/data.module';
import { LegacyModule } from './legacy/legacy.module';
import { configValidationSchema } from './config/config-validation.schema';
import { throttleConfig } from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      validationSchema: configValidationSchema,
      validationOptions: {
        abortEarly: true,
      },
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule.forFeature(throttleConfig)],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        ttl: config.get('throttle.ttlSecs'),
        limit: config.get('throttle.limit'),
      }),
    }),
    AuthModule,
    MainModule,
    StatusModule,
    ProfileModule,
    LadderModule,
    DataModule,
    LegacyModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_GUARD,
      useClass:
        // istanbul ignore next
        process.env.SAS_AUTH_ENABLE === 'true'
          ? JwtAuthGuard
          : PassthroughGuard,
    },
  ],
})
export class AppModule {}
