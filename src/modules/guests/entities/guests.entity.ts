import { BelongsTo, Column, DataType, ForeignKey, HasMany, Min, Model, Table } from "sequelize-typescript";
import { GuestLikes } from "src/modules/guest_likes/entities/guest_likes.entity";
import { Tables } from "src/modules/tables/entities/tables.entity";

@Table({
  paranoid: true
})
export class Guests extends Model<Guests> {
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  name: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  no_tickets: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false
  })
  confirmated: boolean;

  @ForeignKey(() => Tables)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  table_id: number
  @BelongsTo(() => Tables)
  table: Tables
  
  @HasMany(() => GuestLikes)
  guest_likes: GuestLikes[]
}