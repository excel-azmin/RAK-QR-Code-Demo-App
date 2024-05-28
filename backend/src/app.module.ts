import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GetUploadFilesModule } from './common/controller/get-upload-files.module';
import { ItemModule } from './item/item.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://68.183.81.8:27011/rak-db', {
      authSource: 'admin',
    }),
    ItemModule,
    GetUploadFilesModule,
  ],
})
export class AppModule {}
