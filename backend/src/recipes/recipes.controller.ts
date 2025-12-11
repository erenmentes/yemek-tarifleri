import { Controller, Delete, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';

@ApiTags('Recipes')
@Controller('recipes')
export class RecipesController {

    @Get('all')
    @ApiOperation({ summary: 'Tüm tarifleri listele' })
    async getAllRecipes() {

    };

    @Get(':id')
    @ApiOperation({ summary: 'ID ile tarif getir' })
    async getRecipeById() {
        
    };

    @UseGuards(AuthGuard)
    @Post('create')
    @ApiOperation({ summary: 'Yeni tarif oluştur (auth gerekli)' })
    async createNewRecipe() {

    };

    @UseGuards(AuthGuard)
    @Delete('delete')
    @ApiOperation({ summary: 'Tarif sil (auth gerekli)' })
    async deleteRecipe() {

    };

    @UseGuards(AuthGuard)
    @Patch('update')
    @ApiOperation({ summary: 'Tarif güncelle (auth gerekli)' })
    async updateRecipe() {

    };
}
