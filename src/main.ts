import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ValidationPipe} from "@nestjs/common";
import {DocumentBuilder, SwaggerCustomOptions, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe({
        whitelist: true,
        forbidUnknownValues: true,
        transform: true
    }))

    const configSwagger = new DocumentBuilder()
        .setTitle("Username Password JWT")
        .setDescription("Description Username Password JWT")
        .setVersion("1.0")
        .addBearerAuth()
        .build()

    const configCustomSwagger: SwaggerCustomOptions = {
        swaggerOptions: {docExpansion: "none"}
    }

    const doc = SwaggerModule.createDocument(app, configSwagger)
    SwaggerModule.setup("api", app, doc, configCustomSwagger)
    await app.listen(3000);
}

bootstrap();
