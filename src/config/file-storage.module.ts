import { MulterModule } from '@nestjs/platform-express';

export const FileStorageModule = MulterModule.register({
    dest: './uploads'
});
