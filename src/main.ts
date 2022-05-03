import { NestFactory } from '@nestjs/core';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { EventsModule } from './events.module';

async function bootstrap() {
    const app = await NestFactory.create(EventsModule);
    app.useWebSocketAdapter(new IoAdapter(app));

    const config = new DocumentBuilder()
        .setTitle('Cats example')
        .setDescription('The cats API description')
        .setVersion('1.0')
        .addTag('cats')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    
    SwaggerModule.setup('api', app, document);

    await app.listen(0);
}
bootstrap();
