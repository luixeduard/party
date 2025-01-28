import { HasMany, Model, Table } from "sequelize-typescript";
import { TableLikes } from "src/modules/table_likes/entities/table_likes.entity";

@Table({
  paranoid: true
})
export class Tables extends Model<Tables> {
  @HasMany(() => TableLikes)
  table_likes: TableLikes[]
}