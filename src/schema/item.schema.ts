import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ItemDocument = Item & Document;

@Schema()
export class Item {
  @Prop()
  name: string

  @Prop()
  qty: number

  @Prop()
  description: string

  @Prop()
  created: Date

  @Prop()
  modified: Date

  @Prop()
  version: number

}

export const ItemSchema = SchemaFactory.createForClass(Item);