import { Module } from '@nestjs/common';
import { DatabaseModule } from './config/database.module';
import { AppRoutesModule } from './config/app-routes.module';
import { LocalStorageModule } from './config/cls.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
    imports: [DatabaseModule, AppRoutesModule, LocalStorageModule, AuthModule],
    controllers: [],
    providers: []
})
export class AppModule {}
