import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CategoryDTO } from './dto/category.dto';
import { CategoryService } from './category.service';

@ApiTags('Category')
@Controller('category')
export class CategoryController {

    constructor(private categoryService : CategoryService) {};

    @Get('all')
    @ApiOperation({ summary: 'Tüm kategorileri listele' })
    async getAllCategories() {
        return await this.categoryService.getAllCategories();
    };

    @Post('create')
    @ApiOperation({ summary: 'Yeni kategori oluştur' })
    @ApiBody({ type: CategoryDTO })
    async createNewCategory(@Body() categoryDto : CategoryDTO) {
        return await this.categoryService.createNewCategory(categoryDto);
    };

    @Delete('delete')
    @ApiOperation({ summary: 'Kategori sil' })
    @ApiBody({ type: CategoryDTO })
    async deleteCategory(@Body() categoryDto : CategoryDTO) {
        return await this.categoryService.deleteCategory(categoryDto);
    };

    @Patch('update')
    @ApiOperation({ summary: 'Kategori güncelle' })
    async updateCategory(@Body() category_name,new_category_name) {
        return await this.categoryService.updateCategory(category_name,new_category_name);
    };
}
