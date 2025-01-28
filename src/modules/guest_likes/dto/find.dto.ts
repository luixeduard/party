import { IntersectionType } from "@nestjs/swagger";
import { UpdateGuestLikesDTO } from "./update.dto";
import { PaggingDTO } from "src/core/global/dto/pagging.dto";

export class FindGuestLikesDTO extends IntersectionType(UpdateGuestLikesDTO, PaggingDTO) { }