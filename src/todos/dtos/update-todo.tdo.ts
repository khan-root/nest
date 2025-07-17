import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateTodoTdo {
  @IsNotEmpty()
  @IsOptional()
  title?: string;

  @IsBoolean()
  @IsOptional()
  completed?: boolean;

  @IsNotEmpty()
  @IsOptional()
  assignedTo?: string;
}
