
const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/users.js');

// Obtain all contacts
router.get('/', contactsController.getAllUsers);

// Show a create contact form
router.get('/create', contactsController.createContact);

// Show an edit contact form
router.get("/edit/:id", contactsController.showEditForm);

// Obtain a contact by ID                   
router.get('/:id', contactsController.getUserById);

// create a new contact
router.post('/', contactsController.createUser);

// update a contact
router.put('/edit/:id', contactsController.updateUser);

// eliminate a contact
router.delete('/:id', contactsController.deleteUser);

module.exports = router;
