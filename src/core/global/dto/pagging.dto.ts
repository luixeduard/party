import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { ParanoidDTO } from './paranoid.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class PaggingDTO extends ParanoidDTO {
  @ApiPropertyOptional({example: 0})
  @IsOptional()
  @IsNumber()
  readonly page?: number;
  @ApiPropertyOptional({example: 5})
  @IsNumber()
  @ApiPropertyOptional()
  @IsOptional()
  readonly records?: number;
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly search?: string;
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly order?: string;
  @ApiPropertyOptional({example: "name,createdAt"})
  @IsOptional()
  @IsString()
  readonly rows?: string;
  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID(4)
  readonly id?: string;
  @ApiPropertyOptional({example: 'users_book:[book],authors_book:[book]'})
  @Transform(val => `[${val.value.replace(/([+#-]*\b\w+\b|\b\w+\b)/g, '"$1"')}]`)
  @IsOptional()
  @IsString()
  readonly include?: string;
}
