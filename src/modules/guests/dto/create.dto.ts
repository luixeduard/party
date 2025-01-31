import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Min } from "class-validator";
import { NamedObjectDTO } from "src/core/global/dto/global.dto";

export class CreateGuestsDTO extends (NamedObjectDTO){
  @ApiProperty()
  @IsNotEmpty()
  @Min(0)
  readonly no_tickets?: number
}