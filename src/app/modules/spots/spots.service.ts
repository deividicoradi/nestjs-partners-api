import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateSpotDto } from './dto/create-spot.dto';
import { UpdateSpotDto } from './dto/update-spot.dto';
import { Prisma, SpotStatus } from '@prisma/client';
import { PrismaService } from 'src/app/core/prisma/prisma.service';

@Injectable()
export class SpotsService {
  constructor(private prismaService: PrismaService) { }

  async create(createSpotDto: CreateSpotDto & { eventId: string }) {
    try {
      const event = await this.prismaService.event.findFirst({
        where: { id: createSpotDto.eventId },
      });

      if (!event) {
        throw new NotFoundException('Event not found');
      }

      return await this.prismaService.spot.create({
        data: {
          ...createSpotDto,
          status: SpotStatus.available,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new BadRequestException(error.message);
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll(eventId: string) {
    try {
      return await this.prismaService.spot.findMany({
        where: { eventId },
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findOne(eventId: string, spotId: string) {
    try {
      const spot = await this.prismaService.spot.findFirst({
        where: { id: spotId, eventId },
      });
      if (!spot) {
        throw new NotFoundException(`Spot with ID ${spotId} not found`);
      }
      return spot;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new BadRequestException(error.message);
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(eventId: string, spotId: string, updateSpotDto: UpdateSpotDto) {
    try {
      return await this.prismaService.spot.update({
        where: { id: spotId, eventId },
        data: updateSpotDto,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new BadRequestException(error.message);
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  async remove(eventId: string, spotId: string) {
    try {
      return await this.prismaService.spot.delete({
        where: { id: spotId, eventId },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new BadRequestException(error.message);
      }
      throw new InternalServerErrorException(error.message);
    }
  }
}
