import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { AccessTokenUserGuard } from './modules/auth/passport-stratagies/access-token-user/access-token-user.guard';
import { RolesGuard } from './modules/auth/guards/roles.guard';
import { ErrorFilter } from './infra/validators';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'warn', 'error'],
  });

  app.enableCors({
    origin: true,
    credentials: true,
  });
  app.use(cookieParser());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      transform: true,
    }),
  );

  const reflector = app.get(Reflector);

  app.useGlobalFilters(new ErrorFilter());
  app.useGlobalGuards(
    new AccessTokenUserGuard(reflector),
    new RolesGuard(reflector),
  );

  const config = new DocumentBuilder()
    .setTitle('Itransition')
    .setDescription('Course project api')
    .setVersion('0.2')
    .addBearerAuth()
    .addCookieAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  });

  await app.listen(process.env.PORT);
}
bootstrap();
