import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { ZodFilter } from './common/exceptions/zod-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logger = app.get(WINSTON_MODULE_NEST_PROVIDER);
  app.useLogger(logger);

  app.useGlobalFilters(new ZodFilter());

  const config = new DocumentBuilder()
    .setTitle('Agatha Laundry')
    .setDescription('The Agatha Laundry API description')
    .setVersion('1.0')
    .addTag('agatha')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.APP_PORT);
}
bootstrap();
