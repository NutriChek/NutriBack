import { Module } from '@nestjs/common';
import { DatabaseModule } from './config/database.module';
import { AppRoutesModule } from './config/app-routes.module';
import { LocalStorageModule } from './config/cls.module';
import { AuthModule } from './modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthenticatedGuard } from './shared/guards/auth.guard';

@Module({
    imports: [DatabaseModule, AppRoutesModule, LocalStorageModule, AuthModule],
    controllers: [],
    providers: [
        {
            provide: APP_GUARD,
            useClass: AuthenticatedGuard
        }
    ]
})
export class AppModule {}
