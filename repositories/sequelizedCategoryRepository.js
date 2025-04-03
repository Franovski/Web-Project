const Category = require("../models/sequelizedCategoryModel");

class CategoryRepository {

  /**
   * Creates a new category in the database.
   * @param {Category} category - The category object to be created.
   * @returns {Promise<Category>} The created category object.
   */
  static async create(category) {
    try {
      const addedCategory = await Category.create({
        category_name: category.name,
      });
      return addedCategory;
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Updates an existing category in the database.
   * @param {Category} category - The category object to be updated.
   * @returns {Promise<number>} The number of updated rows.
   */
  static async update(category) {
    try {
      const [updated] = await Category.update(
        {
          category_name: category.name,
        },
        {
          where: { category_id: category.id },
        }
      );
      return updated;
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Deletes a category from the database.
   * @param {number} id - The ID of the category to be deleted.
   * @returns {Promise<number>} The number of deleted rows.
   */
  static async delete(id) {
    try {
      return await Category.destroy({ where: { category_id: id } });
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Retrieves all categories from the database.
   * @returns {Promise<Array>} A list of all categories.
   */
  static async readAll() {
    try {
      return await Category.findAll();
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Retrieves a category by its ID.
   * @param {number} id - The ID of the category to be fetched.
   * @returns {Promise<Category|null>} The category object if found, or null if not found.
   */
  static async readCategoryById(id) {
    try {
      return await Category.findByPk(id);
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Retrieves categories by their name.
   * @param {string} name - The name of the category to be fetched.
   * @returns {Promise<Array>} A list of categories that match the name.
   */
  static async readCategoryByName(name) {
    try {
      return await Category.findAll({ where: { category_name: name } });
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Checks if a category exists by its ID.
   * @param {number} id - The ID of the category to check.
   * @returns {Promise<boolean>} `true` if the category exists, otherwise `false`.
   */
  static async isCategoryExistById(id) {
    try {
      const category = await Category.findByPk(id);
      return category !== null;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  /**
   * Checks if a category exists by its name.
   * @param {string} name - The name of the category to check.
   * @returns {Promise<boolean>} `true` if the category exists, otherwise `false`.
   */
  static async isCategoryExistByName(name) {
    try {
      const category = await Category.findOne({
        where: { category_name: name },
      });
      return category !== null;
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

module.exports = CategoryRepository;
