import { Module, Provider } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { authConfig } from '../config';
import { JwtStrategy } from './strategies/jwt.strategy';

const imports = [ConfigModule.forFeature(authConfig)];
const providers: Provider[] = [];

// istanbul ignore next
if (process.env.SAS_AUTH_ENABLE === 'true') {
  imports.push(
    JwtModule.registerAsync({
      imports: [ConfigModule.forFeature(authConfig)],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get('auth.jwtSecret'),
        verifyOptions: {
          ignoreExpiration: true,
        },
      }),
    })
  );
  providers.push(JwtStrategy);
}

@Module({
  imports,
  providers,
})
export class AuthModule {}
