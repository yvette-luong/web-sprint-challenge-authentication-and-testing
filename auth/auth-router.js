const router = require("express").Router();
const config = require("../api/config");

const jwt = require("jsonwebtoken"); // npm i this package
const bcryptjs = require("bcryptjs");

const { isValid } = require("./auth-service");
const Users = require("../auth/auth-model");

router.post("/register", (req, res) => {
  // implement registration
  const users = req.body;

  if (isValid(users)) {
    const rounds = process.env.BCRYPT_ROUND || 8;
    const hash = bcryptjs.hashSync(users.password, rounds); //hash the password
    users.password = hash;

    //save user to dbase
    Users.add(users)
      .then((user) => {
        res
          .status(200)
          .json({ notification: "User is succesfully created", data: user });
      })
      .catch((err) => {
        res.status(500).json({ message: error.message });
      });
  } else {
    res.status(400).json({
      message:
        "Please provide your username and an alphanumeric password to regist ",
    });
  }
});

router.post("/login", (req, res) => {
  const { username, password} = req.body;
  // implement login
  if (isValid(req.body)) {
    Users.findBy(username)
      .then((user) => {
        // compare password & hash stored in db
        if( user && bcryptjs.compareSync(password, user.password)) {
          const token = getJwt(user);
          res.status(200).json({ message:"Welcome, it's srpint day", token})
        } else {
          res.status(401).json({message:"Invalid user"});
        }
      })
      .catch(err =>{
        console.log(err)
        res.status(500).json({ message:err.message})
      })
  } else {
    res.status(400).json({ message:"Please provide your username and an alphanumeric password to login"})
  }
});

function getJwt(user) {
  const payload = {
    username: user.username,
  };
  const jwtTime ={
    expiresIn: "8h",
  };
  return jwt.sign(payload, config.jwtSecret, jwtTime);
}

module.exports = router;
