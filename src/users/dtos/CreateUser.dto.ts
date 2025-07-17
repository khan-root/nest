import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  userName: string;

  @IsOptional()
  displayName?: string;


  @IsOptional()
  avatar?: string;
}
