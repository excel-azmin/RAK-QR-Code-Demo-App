import { ApiProperty } from '@nestjs/swagger';

export class CreateItemDto {
  @ApiProperty({
    description: 'The name of the item',
    example: 'Apple iPhone 13',
  })
  itemName: string;

  @ApiProperty({
    description: 'The unique code of the item',
    example: 'IP13-XYZ',
  })
  itemCode: string;

  @ApiProperty({
    description: 'The series the item belongs to',
    example: 'iPhone 13 Series',
    required: false,
  })
  series?: string;

  @ApiProperty({
    description: 'The current stock count',
    example: '150',
  })
  stock: string;

  @ApiProperty({ type: 'string', format: 'binary' })
  productImage?: Express.Multer.File;
}
