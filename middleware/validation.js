const { body, validationResult } = require('express-validator');

// Middleware de validaciones
const validateContact = [
    body('firstName')
        .notEmpty().withMessage('First name is required')
        .isAlpha('en-US', { ignore: ' ' }).withMessage('First name must only contain letters')
        .isLength({ max: 50 }).withMessage('First name cannot exceed 50 characters'),
    body('lastName')
        .notEmpty().withMessage('Last name is required')
        .isAlpha('en-US', { ignore: ' ' }).withMessage('Last name must only contain letters')
        .isLength({ max: 50 }).withMessage('Last name cannot exceed 50 characters'),
    body('email')
        .isEmail().withMessage('Invalid email format')
        .normalizeEmail(),
    body('birthday')
        .optional()
        .isDate().withMessage('Invalid date format'),
    body('favoriteColor')
        .optional()
        .isLength({ max: 30 }).withMessage('Favorite color cannot exceed 30 characters'),
];

// Controlador para manejar errores
const createUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const newContact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        birthday: req.body.birthday,
        favoriteColor: req.body.favoriteColor,
    };

    try {
        await mongodb.getDatabase().collection('contacts').insertOne(newContact);
        res.status(201).json({ message: 'Contact created successfully!', data: newContact });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create contact' });
    }
};

module.exports = {
    validateContact,
    createUser
};  