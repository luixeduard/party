import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty } from "class-validator";

export class CreateTableLikesDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  readonly table_id: number
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  readonly like_id: number
}