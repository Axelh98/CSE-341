const mongodb = require("../data/database");
const objectId = require("mongodb").ObjectId;

// Obtener todos los contactos
const getAllContacts = async () => {
    const result = await mongodb.getDatabase().collection("contact").find();
    return result.toArray(); 
};

// Obtener un contacto por su ID
const getContactById = async (id) => {
    const userId = new objectId(id);
    const result = await mongodb.getDatabase().collection("contact").find({ _id: userId });
    return result.toArray(); 
};

// Crear un nuevo contacto
const createContact = async (contactData) => {
    const result = await mongodb.getDatabase().collection("contact").insertOne(contactData);
    return result;  
};

// Actualizar un contacto
const updateContact = async (id, contactData) => {
    const userId = new objectId(id);
    const result = await mongodb.getDatabase().collection("contact").updateOne(
        { _id: userId },
        { $set: contactData }
    );
    return result;  
};

// Eliminar un contacto
const deleteContact = async (id) => {
    const userId = new objectId(id);
    const result = await mongodb.getDatabase().collection("contact").deleteOne({ _id: userId });
    return result; 
};

module.exports = {
    getAllContacts,
    getContactById,
    createContact,
    updateContact,
    deleteContact
};
