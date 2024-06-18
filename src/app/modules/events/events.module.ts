import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { PrismaModule } from 'src/app/core/prisma/prisma.module';
import { AuthModule } from 'src/app/core/auth/auth.module';

@Module({
  imports: [AuthModule, PrismaModule],
  providers: [EventsService],
  controllers: [EventsController],
})
export class EventsModule { }
