import { IsBoolean, IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateTodoTdo {
  @IsNotEmpty()
  @IsOptional()
  title?: string;

  @IsBoolean()
  @IsOptional()
  completed?: boolean;

  @IsOptional()
  @IsMongoId()
  assignedTo?: string;
}
