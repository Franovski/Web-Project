const Category = require('../models/sequelizedCategoryModel');

class CategoryRepository {

    static async create(category){
        try{
            const addedCategory = await Category.create({
                category_name: category.name
            });
            return addedCategory;
        }catch(err){
            throw new Error(err);
        }
    }

    static async update(category){
        try{
            const [updated] = await Category.update({
                category_name: category.name
            },
            {
                where: { category_id: category.id }
            });
            return updated;
        }catch(err){
            throw new Error(err);
        } 
    }

    static async delete(id){
        try{
            return await Category.destroy({where: {category_id: id}});
        }catch(err){
            throw new Error(err);
        }
    }

    static async readAll(){
        try{
            return await Category.findAll();
        }catch(err){
            throw new Error(err);
        }
    }

    static async readCategoryById(id){
        try{
            return await Category.findByPk(id);
        }catch(err){
            throw new Error(err);
        }
    }

    static async categoryByName(name){
        try{
            return await Category.findAll({where: {category_name: name}})
        }catch(err){
            throw new Error(err);
        }
    }

    static async isCategoryExistById(id) {
        try {
            const category = await Category.findByPk(id);
            return category !== null;
        } catch (err) {
            throw new Error(err.message);
        }
    }

    static async isCategoryExistByName(name) {
        try {
            const category = await Category.findOne({ where: { category_name: name } });
            return category !== null;
        } catch (err) {
            throw new Error(err.message);
        }
    }
}

module.exports = CategoryRepository;