import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsOptional } from "class-validator";

export class ParanoidDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  readonly paranoid?: boolean;
  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  readonly deletedAt?: boolean;
}