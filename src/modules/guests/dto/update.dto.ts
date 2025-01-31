import { ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { CreateGuestsDTO } from "./create.dto";
import { IsBoolean } from "class-validator";

export class UpdateGuestsDTO extends PartialType(CreateGuestsDTO) {
  @ApiPropertyOptional()
  @IsBoolean()
  readonly confirmated: boolean
}