import { IsBoolean, IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateTodoDto {
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsMongoId()
  owner: string;

  @IsOptional()
  @IsBoolean()
  completed: boolean;

  @IsOptional()
  @IsMongoId()
  assignedTo: string;
}
