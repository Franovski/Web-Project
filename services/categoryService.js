const Category = require('../models/sequelizedCategoryModel');
const CategoryRepositiory = require('../repositories/sequelizedCategoryRepository');

class CategoryService {

    /**
     * @description Creates a new category.
     * @param {Category} category - The category object containing category details.
     * @returns {Promise<Category>} The created category.
     * @throws {Error} If an error occurs during category creation.
     */
    static async create(category)
    {
        try{
            return CategoryRepositiory.create(category);
        }catch(err){
            throw new Error(err);
        }
    }

    /**
     * @description Updates an existing category.
     * @param {Category} category - The category object containing updated details.
     * @returns {Promise<Category>} The updated category.
     * @throws {Error} If the category does not exist or an error occurs.
     */
    static async update(category)
    {
        try{
            if(! await CategoryRepositiory.isCategoryExistById(category.id)){
                throw new Error(`Category with id ${category.id} does not exist`);
            }else{
                return CategoryRepositiory.update(category);
            }
        }catch(err){
            throw new Error(err);
        }  
    }

    /**
     * @description Deletes a category by its ID.
     * @param {number} id - The ID of the category to delete.
     * @returns {Promise<void>} Resolves if deletion is successful.
     * @throws {Error} If the category does not exist or an error occurs.
     */
    static async delete(id)
    {
        try{
            if(! await CategoryRepositiory.isCategoryExistById(id)){
                throw new Error(`Category with id ${id} does not exist`);
            }else{
                return CategoryRepositiory.delete(id);
            }
        }catch(err){
            throw new Error(err);
        }
    }

    static async readAll()
    {
        try {
            // Fetch all categories
            const categories = await CategoryRepositiory.readAll();
    
            // Convert BigInt fields (if any) to strings in the entire array of categories
            const categoriesWithSafeBigInts = JSON.parse(
                JSON.stringify(categories, (key, value) =>
                    typeof value === 'bigint' ? value.toString() : value
                )
            );
    
            return categoriesWithSafeBigInts;
        } catch (err) {
            throw new Error(`Failed to read all categories: ${err.message}`);
        }   
    }

    static async readCategoryById(id)
    {
        try {
            // Check if the category exists by ID
            const categoryExists = await CategoryRepositiory.isCategoryExistById(id);
            if (!categoryExists) {
                throw new Error(`Category with id ${id} does not exist`);
            }
    
            // Fetch the category by ID
            const category = await CategoryRepositiory.readCategoryById(id);
    
            // Convert BigInt fields (if any) to strings before returning
            const categoryWithSafeBigInts = JSON.parse(
                JSON.stringify(category, (key, value) =>
                    typeof value === 'bigint' ? value.toString() : value
                )
            );
    
            return categoryWithSafeBigInts;
        } catch (err) {
            throw new Error(`Failed to read category by id: ${err.message}`);
        }
    }

    static async readCategoryByName(name)
    {
        try {
            // Check if the category exists by name
            const categoryExists = await CategoryRepositiory.isCategoryExistByName(name);
            if (!categoryExists) {
                throw new Error(`Category with name ${name} does not exist`);
            }
    
            // Fetch the category by name
            const category = await CategoryRepositiory.readCategoryByName(name);
    
            // Convert BigInt fields (if any) to strings before returning
            const categoryWithSafeBigInts = JSON.parse(
                JSON.stringify(category, (key, value) =>
                    typeof value === 'bigint' ? value.toString() : value
                )
            );
    
            return categoryWithSafeBigInts;
        } catch (err) {
            throw new Error(`Failed to read category by name: ${err.message}`);
        }
    }
}

module.exports = CategoryService;
