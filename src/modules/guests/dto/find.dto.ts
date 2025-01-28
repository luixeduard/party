import { IntersectionType } from "@nestjs/swagger";
import { UpdateGuestsDTO } from "./update.dto";
import { PaggingDTO } from "src/core/global/dto/pagging.dto";

export class FindGuestsDTO extends IntersectionType(UpdateGuestsDTO, PaggingDTO) { }