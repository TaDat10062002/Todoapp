import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  desc: string;

  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  dueDate: string;
}
