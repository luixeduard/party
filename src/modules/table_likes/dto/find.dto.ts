import { IntersectionType } from "@nestjs/swagger";
import { UpdateTableLikesDTO } from "./update.dto";
import { PaggingDTO } from "src/core/global/dto/pagging.dto";

export class FindTableLikesDTO extends IntersectionType(UpdateTableLikesDTO, PaggingDTO) { }