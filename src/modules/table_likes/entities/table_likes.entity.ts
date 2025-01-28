import { BelongsTo, Column, DataType, ForeignKey, HasMany, Min, Model, Table } from "sequelize-typescript";
import { Likes } from "src/modules/likes/entities/likes.entity";
import { Tables } from "src/modules/tables/entities/tables.entity";

@Table({
  paranoid: true
})
export class TableLikes extends Model<TableLikes> {
  @ForeignKey(() => Tables)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  table_id: number
  @BelongsTo(() => Tables)
  table: Tables
  @ForeignKey(() => Likes)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  like_id: number
  @BelongsTo(() => Likes)
  like: Likes
}