const express = require('express');
const CategoryController = require("../controllers/categoryController");
const { validateCategory, validateCategoryId, validateCategoryByName } = require('../validators/category.dto');
const router = express.Router();

router.get('/', CategoryController.readAll);
router.get('/:id', validateCategoryId, CategoryController.readCategoryById);
router.get('/name/:name', validateCategoryByName, CategoryController.readCategoryByName);
router.post('/', validateCategory, CategoryController.create);
router.put('/:id', validateCategoryId, CategoryController.update);
router.delete('/:id', validateCategoryId, CategoryController.delete);

module.exports = router;
