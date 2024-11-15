const mongodb = require("../data/database");
const objectId = require("mongodb").ObjectId;

// Obtener todos los contactos
const getAllUsers = async (req, res) => {
    const result = await mongodb.getDatabase().collection("contact").find();
    result.toArray().then((contacts) => {
        res.render("contacts", { contacts });
    });
};

// Obtener un solo contacto por id
const getUserById = async (req, res) => {
    const userId = new objectId(req.params.id);
    const result = await mongodb.getDatabase().collection("contact").find({ _id: userId });
    result.toArray().then((contact) => {
        res.render("contact-profile", { contact: contact[0] });
    });
};

// Crear un nuevo contacto
const createUser = async (req, res) => {
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
    const userId = new objectId(req.params.id);
    const updatedContact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    await mongodb.getDatabase().collection("contact").updateOne({ _id: userId }, { $set: updatedContact });
    res.redirect(`/contacts/${userId}`);
};

// Eliminar un contacto
const deleteUser = async (req, res) => {
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
    createContact
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