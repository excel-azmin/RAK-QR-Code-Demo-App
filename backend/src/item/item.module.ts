import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ItemImageloadModule } from 'src/common/module/item-image-upload.module';
import { ItemSchema } from './entities/item.entity';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Item', schema: ItemSchema }]),
    ItemImageloadModule,
  ],
  controllers: [ItemController],
  providers: [ItemService],
})
export class ItemModule {}
