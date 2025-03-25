const Category = require('../models/categoryModel');
const categoryService = require('../services/categoryService.js');

class CategoryController{

    static async create(req,res){
        try{
            const {name} = req.body;
            var category = new Category(0,name);
            const result = await categoryService.create(category);
            res.status(200).json(result);
        }catch(err){
            console.error("Error in CategoryController.create: " , err.message);
            res.status(500).json(err.message);
        }
    }

    static async update(req,res){
        try{
            const {name} = req.body;
            const {id} = req.params;
            var category = new Category(id,name);
            const result = await categoryService.update(category);
            res.status(200).json(result);
        }catch(err){
            console.error("Error in CategoryController.update: " , err.message);
            res.status(500).json(err.message);
        }
    }

    static async delete(req,res){
        try{
            const {id} = req.params;
            const result = await categoryService.delete(id);
            res.status(200).json(result);
        }catch(err){
            console.error("Error in CategoryController.delete: " , err.message);
            res.status(500).json(err.message);
        }
    }

    static async readAll(req,res){
        try{
            const result = await categoryService.readAll();
            res.status(200).json(result);
        }catch(err){
            console.error("Error in CategoryController.readAll: " , err.message);
            res.status(500).json(err.message);
        }
    }

    static async readCategoryById(req,res){
        try{
            const {id} = req.params;
            const result = await categoryService.readCategoryById(id);
            res.status(200).json(result);
    }catch(err){
            console.error("Error in CategoryController.readCategoryById: " , err.message);
            res.status(500).json(err.message);
        }
    }

    static async readCategoryByName(req,res){
        try{
            const {name} = req.params;
            const result = await categoryService.readCategoryByName(name);
            res.status(200).json(result);
        }catch(err){
            console.error("Error in CategoryController.readCategoryByName: " , err.message);
            res.status(500).json(err.message);
        }
    }
}

module.exports = CategoryController;