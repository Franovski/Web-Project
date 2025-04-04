const express = require('express');
const SectionController = require('../controllers/sectionController');
const { validateSectionById, validateSectionByName, validateSection, validateSectionByStatus } = require('../validators/section.dto');
const router = express.Router();

router.get('/', SectionController.readAll);
router.get('/:id', validateSectionById, SectionController.readSectionById);
router.get('/name/:name', validateSectionByName, SectionController.readSectionByName);
router.get('/status/:status', validateSectionByStatus, SectionController.readSectionByStatus);
router.post('/', validateSection, SectionController.create);
router.put('/:id', validateSectionById, validateSection,SectionController.update);
router.delete('/:id', validateSectionById, SectionController.delete);
module.exports = router;
