import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { GuestLikes } from "src/modules/guest_likes/entities/guest_likes.entity";
import { TableLikes } from "src/modules/table_likes/entities/table_likes.entity";

@Table({
  paranoid: true
})
export class Likes extends Model<Likes> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;
  
  @HasMany(() => TableLikes)
  table_likes: TableLikes[]
  
  @HasMany(() => GuestLikes)
  guest_likes: GuestLikes[]
}