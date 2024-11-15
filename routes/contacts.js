const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/users.js');

// Obtain all contacts
router.get('/', contactsController.getAllUsers);

// Obtain a contact by ID
router.get('/:id', contactsController.getUserById);

// Show a create contact form
router.get('/create', contactsController.createContact);

// create a new contact
router.post('/', contactsController.createUser);

// update a contact
router.put('/:id', contactsController.updateUser);

// eliminate a contact
router.delete('/:id', contactsController.deleteUser);

module.exports = router;
