import { ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { CreateGuestsDTO } from "./create.dto";
import { IsBoolean, IsNotEmpty } from "class-validator";

export class UpdateGuestsDTO extends PartialType(CreateGuestsDTO) {
  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsBoolean()
  readonly confirmated: boolean
}