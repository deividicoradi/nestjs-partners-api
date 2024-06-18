import { TicketKind } from '@prisma/client';
import { ArrayNotEmpty, IsArray, IsEmail, IsEnum, IsString } from 'class-validator';

export class ReserveSpotDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  spots: string[];

  @IsEnum(TicketKind)
  ticket_kind: TicketKind;

  @IsEmail()
  email: string;
}

