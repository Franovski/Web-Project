const express = require('express');
const TicketController = require('../controllers/ticketController');
const { validateTicket, validateTicketById, validateTicketByStatus } = require('../validators/ticket.dto');
const router = express.Router();

router.get('/', TicketController.readAll);
router.get('/:id', validateTicketById, TicketController.readTicketById);
router.get('/status/:status', validateTicketByStatus, TicketController.readTicketByStatus);
router.post('/', validateTicket, TicketController.create);
router.put('/:id', validateTicketById, validateTicket, TicketController.update);
router.delete('/:id', validateTicketById, TicketController.delete);

module.exports = router;