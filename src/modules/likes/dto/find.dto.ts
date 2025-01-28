import { IntersectionType } from "@nestjs/swagger";
import { UpdateLikesDTO } from "./update.dto";
import { PaggingDTO } from "src/core/global/dto/pagging.dto";

export class FindLikesDTO extends IntersectionType(UpdateLikesDTO, PaggingDTO) { }