import { ApiProperty } from '@nestjs/swagger';
import { Int32 } from "typeorm";

export class CreateRecipeDTO {
    @ApiProperty({ example: 'Menemen', description: 'Tarif başlığı' })
    recipe_title : string;

    @ApiProperty({ example: 'Domates, biber ve yumurta ile yapılır...', description: 'Tarif içeriği' })
    recipe_content : string;

    @ApiProperty({ example: 'Kahvaltı', description: 'Tarifin kategorisi' })
    category_name : string;

    @ApiProperty({ type: [Number], description: 'Tarifte kullanılacak malzemelerin ID listesi' })
    IngredientList : Array<Int32>;
}
