import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  UseGuards,
  UseFilters,
} from '@nestjs/common';
import { CreateEventRequest } from './request/create-event.request';
import { UpdateEventRequest } from './request/update-event.request';
import { EventsService } from './events.service';
import { AuthGuard } from 'src/app/core/auth/auth.guard';
import { ReserveSpotDto } from './request/reserve-spot.request';
import { AllExceptionsFilter } from 'src/app/core/exceptions/exceptions.filter';

@Controller('events')
@UseFilters(AllExceptionsFilter)
export class EventsController {
  constructor(private readonly eventsService: EventsService) { }

  @Post()
  create(@Body() createEventRequest: CreateEventRequest) {
    return this.eventsService.create(createEventRequest);
  }

  @Get()
  findAll() {
    return this.eventsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEventRequest: UpdateEventRequest,
  ) {
    return this.eventsService.update(id, updateEventRequest);
  }

  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventsService.remove(id);
  }

  @UseGuards(AuthGuard)
  @Post(':id/reserve')
  reserveSpots(
    @Body() reserveRequest: ReserveSpotDto,
    @Param('id') eventId: string,
  ) {
    return this.eventsService.reserveSpot({ ...reserveRequest, eventId });
  }
}
