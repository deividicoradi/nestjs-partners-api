import { Module } from '@nestjs/common';
import { SpotsController } from './spots.controller';
import { SpotsService } from './spots.service';
import { AuthModule } from 'src/app/core/auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [SpotsService],
  controllers: [SpotsController],
})
export class SpotsModule { }
