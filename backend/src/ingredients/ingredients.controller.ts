import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Ingredients } from 'src/entities/entities/Ingredients';
import { Repository } from 'typeorm';

@ApiTags('Ingredients')
@Controller('ingredients')
export class IngredientsController {

    constructor(@InjectRepository(Ingredients) private ingredientsRepo: Repository<Ingredients>) { }

    @Get('all')
    @ApiOperation({ summary: 'Tüm malzemeleri listele' })
    async getAllIngredients() {
        return await this.ingredientsRepo.find();
    };

    @Post('create')
    @ApiOperation({ summary: 'Yeni malzeme oluştur' })
    @ApiBody({ schema: { type: 'object', properties: { ingredient_name: { type: 'string' } } } })
    async createNewIngredient(@Body('ingredient_name') ingredientName : string) {
        const IsExists = await this.ingredientsRepo.findOne({where : {ingredientName : ingredientName}});
        if (IsExists) return "This ingredient already exists.";

        await this.ingredientsRepo.create({ingredientName : ingredientName});
        return "Ingredient " + ingredientName + " created successfully!";
    };

    @Delete('delete')
    @ApiOperation({ summary: 'Malzeme sil' })
    @ApiBody({ schema: { type: 'object', properties: { ingredient_name: { type: 'string' } } } })
    async deleteIngredient(@Body('ingredient_name') ingredientName : string) {
        const IsExists = await this.ingredientsRepo.findOne({where : {ingredientName : ingredientName}});
        if (!IsExists) return "This ingredient does not exists.";

        await this.ingredientsRepo.delete({ingredientName : ingredientName});
        return "Ingredient " + ingredientName + " deleted successfully.";
    };

    @Patch('update')
    @ApiOperation({ summary: 'Malzeme güncelle' })
    @ApiBody({ schema: { type: 'object', properties: { ingredient_name: { type: 'string' }, new_ingredient_name: { type: 'string' } } } })
    async updateIngredient(@Body('ingredient_name') ingredientName : string, @Body('new_ingredient_name') new_ingredient_name : string) {
        const IsExists = await this.ingredientsRepo.findOne({where : {ingredientName : ingredientName}});
        if (!IsExists) return "This ingredient does not exists.";

        return await this.ingredientsRepo.update({ingredientName : ingredientName}, {ingredientName : new_ingredient_name});
    };
}
