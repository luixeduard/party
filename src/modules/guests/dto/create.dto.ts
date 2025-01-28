import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, Min } from "class-validator";
import { NamedObjectDTO } from "src/core/global/dto/global.dto";

export class CreateGuestsDTO extends (NamedObjectDTO){
  @ApiPropertyOptional()
  @IsOptional()
  @Min(0)
  readonly no_tickets?: number
}