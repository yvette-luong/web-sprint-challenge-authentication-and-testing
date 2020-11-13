/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const jwt = require('jsonwebtoken')
const { jwtSecret } = require('../api/config')

module.exports = (req, res, next) => {
  res.status(401).json({ you: 'shall not pass!' });
  const token = req.headers.authorization;

    if(token) {
      jwt.verify(token, jwtSecret, (err, decodedToken) =>{
        if(err){
          //if token is invalid
          res.status(401).json({notification:'The token is invalid - Not allow to acces', errMessage: err.message})
        } else {
          //or token is valid
          req.jwt = decodedToken;
          next()
        }
      });
    } else {
      res.status(401).json({ notification: "You are not allow to pass without authorization", errMessage:err.message });
    }
};
