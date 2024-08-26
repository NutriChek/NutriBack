import { ServeStaticModule } from '@nestjs/serve-static';

export const FileServeModule = ServeStaticModule.forRoot({
    rootPath: './uploads',
    serveRoot: '/files'
});
