import { ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { CreateGuestsDTO } from "./create.dto";
import { IsBoolean, IsOptional } from "class-validator";

export class UpdateGuestsDTO extends PartialType(CreateGuestsDTO) {
  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  readonly confirmated?: boolean
}