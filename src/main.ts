import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

function initSwagger(app: INestApplication<any>) {
    const config = new DocumentBuilder()
        .setTitle('NutriCheck API')
        .setDescription('The NutriCheck API endpoints and descriptions')
        .setVersion('1.0')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
}

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    initSwagger(app);

    await app.listen(8000);
}

void bootstrap();
