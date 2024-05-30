import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { createCanvas, loadImage } from 'canvas';
import * as fs from 'fs';
import { Model } from 'mongoose';
import * as path from 'path';
import * as QRCode from 'qrcode';
import { CreateItemDto } from './dto/create-item.dto';
import { Item } from './entities/item.entity';

@Injectable()
export class ItemService {
  constructor(
    @InjectModel(Item.name) private readonly userModel: Model<Item>,
  ) {}

  async create(
    CreateItemDto: CreateItemDto,
    productImage: Express.Multer.File,
  ): Promise<Item> {
    const createItem = new this.userModel(CreateItemDto);
    createItem.productImage = productImage.filename;
    const itemData = await createItem.save();
    const qrCodePath = await this.generateQrCodeWithLogo(
      `https://qrdemo.arcapps.org/product/${itemData._id}`,
      'src/assets/images.png',
      './uploads/qrcode/', // Ensure this directory exists or is created dynamically
    );
    const allData = await this.userModel.findByIdAndUpdate(
      itemData._id,
      { $set: { productQrCode: qrCodePath.split('/')[2] } },
      {
        new: true,
      },
    );
    return allData;
  }

  async findAll(): Promise<Item[]> {
    return await this.userModel.find();
  }

  async findOne(id: string) {
    return await this.userModel.findById(id);
  }

  async generateQrCodeWithLogo(
    text: string,
    logoPath: string,
    outputPath: string, // Add parameter to specify where to save the QR code
  ): Promise<string> {
    // Change return type to Promise<string> which returns the file path
    const canvas = createCanvas(300, 300);
    const ctx = canvas.getContext('2d');

    // Generate the QR code on the canvas
    await QRCode.toCanvas(canvas, text, {
      errorCorrectionLevel: 'H',
      margin: 2,
      width: 300,
    });

    // Load and draw the logo in the center
    const logo = await loadImage(logoPath);
    const logoSize = 60; // Size of the logo
    const dx = canvas.width / 2 - logoSize / 2;
    const dy = canvas.height / 2 - logoSize / 2;
    ctx.drawImage(logo, dx, dy, logoSize, logoSize);

    // Save the canvas to a file
    const buffer = canvas.toBuffer('image/png');
    const filePath = path.join(outputPath, `${Date.now()}-qrcode.png`);
    fs.writeFileSync(filePath, buffer);

    return filePath; // Return the path to the saved file
  }
}
