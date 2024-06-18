import { Module } from "@nestjs/common";
import { EventsModule } from "./app/modules/events/events.module";
import { SpotsModule } from "./app/modules/spots/spots.module";
import { ConfigModule } from "@nestjs/config";


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    EventsModule, SpotsModule],
  providers: [],

})
export class AppModule { }