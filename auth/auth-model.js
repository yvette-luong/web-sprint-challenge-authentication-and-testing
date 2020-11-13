const db = require("../database/dbConfig")
module.exports = {
    add, 
    findBy,
    findById
};


async function add(user) {
    try {
      const [id] = await db("users").insert(user, "id");
  
      return findById(id);
    } catch (error) {
      throw error;
    }
  }
  
  function findById(id) {
    return db("users").where({ id }).first();
  }
  
  function findBy(filter) {
    return db("users").where({ username: filter }).first();
  }
  