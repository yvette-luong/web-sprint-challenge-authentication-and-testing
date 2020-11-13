const db = require("../database/dbConfig")
module.exports = {
    add, 
    findBy 
};


function add(user) {
    return db("users").insert(user, "id");
}

function findBy(id) {
   return db("users").where({ id }).first();
} 
