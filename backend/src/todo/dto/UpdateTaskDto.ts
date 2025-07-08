import { IsNotEmpty, IsOptional, IsString } from 'class-validator';


export class UpdateTaskDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  desc: string;

  @IsString()
  @IsOptional()
  isDone?: string;
}