import { PartialType } from "@nestjs/swagger";
import { CreateLikesDTO } from "./create.dto";

export class UpdateLikesDTO extends PartialType(CreateLikesDTO) { }