const mongodb = require("../data/database");
const objectId = require("mongodb").ObjectId;

// Obtener todos los contactos
const getAllUsers = async (req, res) => {
    //swagger.tag("Contacts");
    const result = await mongodb.getDatabase().collection("contact").find();
    result.toArray().then((contacts) => {
        res.render("contacts", { contacts });
    });
};

// obtaining a single contact by id
const getUserById = async (req, res) => {
    //swagger.tag("Contacts");
    const userId = new objectId(req.params.id);     
    const result = await mongodb.getDatabase().collection("contact").find({ _id: userId }).toArray();

    if (result.length > 0) {
        
        res.render("contact-profile", { contact: result[0] });
    } else {
        res.status(404).send("Contact not found");
    }
};

// Crear un nuevo contacto
const createUser = async (req, res) => {    
    //swagger.tag("Contacts");
    const newContact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    await mongodb.getDatabase().collection("contact").insertOne(newContact);
    res.redirect("/contacts");
};

// Show a create contact form
const createContact = async (req, res) => {
    res.render("contact-create");
};

// Actualizar un contacto
const updateUser = async (req, res) => {
    //swagger.tag("Contacts");
    const userId = new objectId(req.params.id);
    const updatedContact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    await mongodb.getDatabase().collection("contact").replaceOne({ _id: userId }, updatedContact );
    res.redirect(`/contacts/${userId}`);
};


const showEditForm = async (req, res) => {
    const userId = new objectId(req.params.id); 
    const result = await mongodb.getDatabase().collection("contact").find({ _id: userId }).toArray();

    if (result.length > 0) {
        const contact = result[0]; // Si el contacto existe, obtén el primer (y único) elemento
        res.render("contact-edit", { contact }); // Renderiza la vista de edición, pasando los datos del contacto
    } else {
        res.status(404).send("Contact not found"); // Si no se encuentra el contacto, muestra un error
    }
};


// Eliminar un contacto
const deleteUser = async (req, res) => {
    //swagger.tag("Contacts");
    const userId = new objectId(req.params.id);
    await mongodb.getDatabase().collection("contact").deleteOne({ _id: userId });
    res.redirect("/contacts");
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    createContact,
    showEditForm
};




/*
const mongodb = require("../data/database");
const objectId = require("mongodb").ObjectId;

const getAllUsers = async (req, res) => {
    const result = await mongodb.getDatabase().collection("contact").find();
    result.toArray().then((contacts) => {
        res.render("contacts", { contacts }); // Renderiza la vista con los datos de contactos
    });
};

const getUserById = async (req, res) => {
    const userId = new objectId(req.params.id);     
    const result = await mongodb.getDatabase().collection("contact").find( { _id:userId } );
    result.toArray().then((contact) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(contact[0]);
    });
};






module.exports = {
    getAllUsers,
    getUserById
};*/