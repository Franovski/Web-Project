const express = require ('express');
const EventController = require ('../controllers/eventController');
const { validateEventById, validateEventByName, validateEvent, validateEventByStatus, 
    validateEventByCategoryId, validateEventDateById } = require('../validators/event.dto');
    
const router = express.Router();

router.get('/viewEvents', EventController.loadEventsView);
router.get('/createEvent', EventController.showEventForm);
router.get('/admin/viewEvents', EventController.loadAdminEvents);
router.get('/editEvent/:id', EventController.loadEditEventPage);
router.post('/updateEvent/:id', EventController.updateEvent);
router.post('/createEvent', validateEvent, EventController.createEventForm);
router.get ('/', EventController.readAll);
router.get ('/:id', validateEventById, EventController.readEventById);
router.get ('/name/:name', validateEventByName, EventController.readEventByName);
router.get('/status/:status', validateEventByStatus, EventController.readEventByStatus);
router.get('/category/:categoryId', validateEventByCategoryId, EventController.readEventByCategoryId);
router.get ('/date/:id', validateEventDateById, EventController.readEventDateById);
router.put ('/:id', validateEventById, validateEvent, EventController.update);
router.post ('/', validateEvent, EventController.create);
router.delete ('/:id', validateEventById, EventController.delete);
module.exports = router;