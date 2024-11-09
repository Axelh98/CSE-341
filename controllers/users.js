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
};