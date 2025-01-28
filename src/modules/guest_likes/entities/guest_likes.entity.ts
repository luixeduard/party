import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Guests } from "src/modules/guests/entities/guests.entity";
import { Likes } from "src/modules/likes/entities/likes.entity";

@Table({
  paranoid: true
})
export class GuestLikes extends Model<GuestLikes> {
  @ForeignKey(() => Guests)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  guest_id: number
  @BelongsTo(() => Guests)
  guest: Guests
  @ForeignKey(() => Likes)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  like_id: number
  @BelongsTo(() => Likes)
  like: Likes
}