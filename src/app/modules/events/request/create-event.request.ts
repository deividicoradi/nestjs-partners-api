import { IsDateString, IsNumber, IsString, MaxLength, Min } from "class-validator";



export class CreateEventRequest {
  @IsString()
  @MaxLength(255)
  name: string;

  @IsString()
  @MaxLength(255)
  description: string;

  @IsDateString()
  date: string;

  @IsNumber()
  @Min(0)
  price: number;
}
