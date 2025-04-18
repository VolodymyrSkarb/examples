import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import { JwtAuthGuard } from './auth/jwt-auth.guard';
import * as cookieParser from 'cookie-parser';

async function start() {
    const PORT = process.env.PORT || 5000;
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
        .setTitle('ToDo App BackEnd')
        .setDescription('Rest Api')
        .setVersion('1.0.0')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);
    // app.useGlobalGuards([JwtAuthGuard]);
    app.enableCors({ credentials: true, origin: process.env.CLIENT_URL });
    // app.use(cookieParser());

    await app.listen(PORT, () =>
        console.log(`Server started on port - ${PORT}`),
    );
}

start();
