
import { PickType } from "@nestjs/swagger";
import { PaggingDTO } from "./pagging.dto";

export class FindOnePopulateDTO extends PickType(PaggingDTO, ["deletedAt", "include", "paranoid", "rows"]) {}