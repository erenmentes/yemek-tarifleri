import { ApiProperty } from '@nestjs/swagger';

export class CategoryDTO {
    @ApiProperty({ example: 'Ana Yemek', description: 'Kategori adı' })
    category_name : string;
};
