import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { DatabaseErrorFilter } from './core/exceptions/databaseError.filter';
import { ValidationErrorFilter } from './core/exceptions/validation.filter';
import { TransformIdInterceptorEncriptor } from './core/interceptors/encrypts';
import { TransformIdInterceptorDecryptor } from './core/interceptors/decrypt';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();// sirve para poder hacer peticiones entre dos plataformas 
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    transformOptions: { enableImplicitConversion: true },
    whitelist: true
  }));

  const config = new DocumentBuilder()
    .setTitle('Party Backend')
    .setDescription('Backend de cumpleaños Alex')
    .setVersion('1.0.0')
    .addBasicAuth()
    .build();

  app.useGlobalInterceptors(new TransformIdInterceptorEncriptor());
  app.useGlobalInterceptors(new TransformIdInterceptorDecryptor());

  app.setGlobalPrefix('api');

  app.useGlobalFilters(new ValidationErrorFilter())
  app.useGlobalFilters(new DatabaseErrorFilter())

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs',
    app,
    document,
    {
      swaggerOptions: {
        docExpansion: 'none',
        plugins: [
          (...args: any[]) => (window as any).HierarchicalTagsPlugin(...args),
          // This is added by nestjs by default and would be overridden if not included
          (...args: any[]) => (window as any).SwaggerUIBundle.plugins.DownloadUrl(...args),
        ],
        hierarchicalTagSeparator: '/', // This must be a string, as RegExp will not survive being json encoded
      },
      customJs: ['https://unpkg.com/swagger-ui-plugin-hierarchical-tags']
    }
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
