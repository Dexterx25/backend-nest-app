import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { existsSync } from "fs";
import { join } from "path";
import { configSwagger } from './configurations/swagger.config';

import {
  NestExpressApplication,
  ExpressAdapter,
} from "@nestjs/platform-express";

async function bootstrap() {
  const paths = { public: "", views: "" };
  if (existsSync(join(__dirname, "views"))) {
    paths.public = join(__dirname, "public");
    paths.views = join(__dirname, "views");
  } else {
    const src = __dirname.split("/").filter((value) => value !== "dist");
    paths.public = join(src.join("/"), "public");
    paths.views = join(src.join("/"), "views");
  }
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter()
  );
  app.useStaticAssets(join(__dirname.replace('dist', 'src'), 'public'));
  app.setBaseViewsDir(join(__dirname.replace('dist', 'src'), 'assets'));
  app.setBaseViewsDir(join(__dirname.replace('dist', '.'), 'utils/pdf/templates/hbs'));
  app.setViewEngine('hbs');
  app.useGlobalPipes(new ValidationPipe());
   await configSwagger(app)

  await app.listen(3000);
}
bootstrap();
