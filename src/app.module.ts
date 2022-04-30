//import { CronModule } from "src/cron";
import { ConfigModule } from "@nestjs/config";
import { Module } from "@nestjs/common";
import { DatabaseModule } from "./database";
import { ScheduleModule } from "@nestjs/schedule";
import { UserModule } from "./routes/user/user.module";
import { AuthModule } from "./routes/auth/auth.module";
import { RoomsModule } from "./routes/rooms/rooms.module";
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
  //  CronModule,
    RoomsModule,
    UserModule,
    AuthModule,
    DatabaseModule,
  ],
})
export class AppModule {}
 