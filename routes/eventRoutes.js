const express = require ('express');
const EventController = require ('../controllers/eventController');
const { validateEventById, validateEventByName, validateEvent, validateEventByStatus, validateEventByCategoryId } = require('../validators/event.dto');
const router = express.Router();

router.get ('/', EventController.readAll);
router.get ('/:id', validateEventById, EventController.readEventById);
router.get ('/name/:name', validateEventByName, EventController.readEventByName);
router.get('/status/:status', validateEventByStatus, EventController.readEventByStatus);
router.get('/category/:categoryId', validateEventByCategoryId, EventController.readEventByCategoryId);
router.get ('/date/:id', EventController.readEventDateById);
router.put ('/:id', validateEventById, EventController.update);
router.post ('/', validateEvent, EventController.create);
router.delete ('/:id', validateEventById, EventController.delete);
module.exports = router;