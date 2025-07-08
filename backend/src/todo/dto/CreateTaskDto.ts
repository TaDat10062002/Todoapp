import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto{
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  desc: string;

  @IsString()
  @IsOptional()
  dueDate: string;
}