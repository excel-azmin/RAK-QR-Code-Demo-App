import { Controller, Get, Param, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@Controller('uploads')
@ApiTags('Get Upload Files')
export class GetUploadFilesController {
  @Get('item-image/:filename')
  async getUserProfileImage(@Param('filename') filename, @Res() res: Response) {
    res.sendFile(filename, { root: './uploads/item' });
  }

  @Get('qrcode-image/:filename')
  async getBucketCategoryImage(
    @Param('filename') filename,
    @Res() res: Response,
  ) {
    res.sendFile(filename, { root: './uploads/qrcode' });
  }
}
