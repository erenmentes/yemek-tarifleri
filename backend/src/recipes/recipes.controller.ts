import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { RecipesService } from './recipes.service';
import { CreateRecipeDTO } from './dto/create-recipe.dto';

@ApiTags('Recipes')
@Controller('recipes')
export class RecipesController {

    constructor(private recipesService : RecipesService) {};

    @Get('all')
    @ApiOperation({ summary: 'Tüm tarifleri listele' })
    async getAllRecipes() {
        return await this.recipesService.getAllRecipes();
    };

    @Get(':id')
    @ApiOperation({ summary: 'ID ile tarif getir' })
    async getRecipeById(@Param('id') id : number) {
        return await this.recipesService.getRecipeById(id);
    };

    @UseGuards(AuthGuard)
    @Post('create')
    @ApiOperation({ summary: 'Yeni tarif oluştur (auth gerekli)' })
    async createNewRecipe(@Body() createRecipeDto : CreateRecipeDTO, @Body('author') author : string) {
        return await this.recipesService.createNewRecipe(createRecipeDto,author);
    };

    @UseGuards(AuthGuard)
    @Delete('delete')
    @ApiOperation({ summary: 'Tarif sil (auth gerekli)' })
    async deleteRecipe(@Body('recipe_title') recipe_title : string) {
        return await this.recipesService.deleteRecipe(recipe_title);
    };

    @UseGuards(AuthGuard)
    @Patch('update')
    @ApiOperation({ summary: 'Tarif güncelle (auth gerekli)' })
    async updateRecipe(@Body() createRecipeDto : CreateRecipeDTO) {
        return await this.recipesService.updateRecipe(createRecipeDto);
    };

    @Get('filter-by-category/:category')
    @ApiOperation({ summary: 'Kategorisine göre tarifleri filtrele' })
    async filterRecipesByCategory(@Param('category') category : string) {
        return await this.recipesService.filterRecipesByCategory(category);
    };

    @Get('filter-by-ingredients')
    @ApiOperation({ summary: 'Malzemelere göre tarifleri filtrele' })
    @ApiBody({
        schema: {
            type: 'array',
            items: { type: 'string' },
            description: 'Filtrelemek için malzeme isimleri listesi',
        },
    })
    async filterRecipesByIngredients(@Body() ingredients : string[]) {
        return await this.recipesService.filterRecipesByIngredients(ingredients);
    };
}
