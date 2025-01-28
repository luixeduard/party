import { PartialType } from "@nestjs/swagger";
import { CreateTableLikesDTO } from "./create.dto";

export class UpdateTableLikesDTO extends PartialType(CreateTableLikesDTO) { }