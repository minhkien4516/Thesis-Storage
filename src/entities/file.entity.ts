import {
  Column,
  DataType,
  IsUUID,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import { v4 as uuidV4 } from 'uuid';
@Table
export class File extends Model {
  @IsUUID(4)
  @PrimaryKey
  @Column({ defaultValue: uuidV4() })
  id: string;

  @Column
  ownerId: string;

  @Column(DataType.TEXT)
  url: string;
}
