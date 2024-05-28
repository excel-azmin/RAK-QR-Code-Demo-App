import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Item extends Document {
  @Prop({ isRequired: true })
  itemName: string;
  @Prop({ isRequired: true })
  itemCode: string;
  @Prop()
  series: string;
  @Prop({ isRequired: true })
  stock: string;
  @Prop({ type: String, default: null }) // This might store the path or filename of the uploaded image
  productImage: string;
  @Prop({ type: String, default: null }) // This might store the path or filename of the uploaded image
  productQrCode: string;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
