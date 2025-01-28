import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty } from "class-validator";

export class CreateGuestLikesDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  readonly guest_id: number
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  readonly like_id: number
}