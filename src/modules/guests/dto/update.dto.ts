import { PartialType } from "@nestjs/swagger";
import { CreateGuestsDTO } from "./create.dto";

export class UpdateGuestsDTO extends PartialType(CreateGuestsDTO) { }