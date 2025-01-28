import { PartialType } from "@nestjs/swagger";
import { CreateTablesDTO } from "./create.dto";

export class UpdateTablesDTO extends PartialType(CreateTablesDTO) { }