import { IntersectionType } from "@nestjs/swagger";
import { UpdateTablesDTO } from "./update.dto";
import { PaggingDTO } from "src/core/global/dto/pagging.dto";

export class FindTablesDTO extends IntersectionType(UpdateTablesDTO, PaggingDTO) { }