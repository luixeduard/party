import { PartialType } from "@nestjs/swagger";
import { CreateGuestLikesDTO } from "./create.dto";

export class UpdateGuestLikesDTO extends PartialType(CreateGuestLikesDTO) { }