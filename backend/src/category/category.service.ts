import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from 'src/entities/entities/Categories';
import { Repository } from 'typeorm';
import { CategoryDTO } from './dto/category.dto';

@Injectable()
export class CategoryService {

    constructor(@InjectRepository(Categories) private repo: Repository<Categories>) { }

    async getAllCategories() {
        return this.repo.find();
    };

    async createNewCategory(categoryDto: CategoryDTO) {
        const IsExists = await this.repo.findOne({ where: { categoryName: categoryDto.category_name } });
        if (IsExists) return "Category already exists.";

        const newCategory = this.repo.create({ categoryName: categoryDto.category_name });
        await this.repo.save(newCategory);

        return "Category " + categoryDto.category_name + " created successfully!";
    };

    async deleteCategory(categoryDto: CategoryDTO) {
        const IsExists = await this.repo.findOne({ where: { categoryName: categoryDto.category_name } });
        if (!IsExists) throw new NotFoundException("Category not found.");

        this.repo.delete({ categoryName: categoryDto.category_name });
        return "Category " + categoryDto.category_name + " deleted successfully!";
    };

    async updateCategory(category_name, new_category_name) {
        const IsExists = await this.repo.findOne({ where: { categoryName: category_name } });
        if (!IsExists) throw new NotFoundException("Category not found.");

        await this.repo.update(
            { categoryName: category_name },
            { categoryName: new_category_name }
        );

        return "Category " + category_name + " updated successfully!";
    };
}
