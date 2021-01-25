const axios = require('axios');

const router = require('express').Router();

router.get('/', (req, res) => {
  const requestOptions = {
    headers: { accept: 'application/json' },
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
});

//checkuser function 
function checkUser(username) {
  return function (req,res,next) {
    if (req.jwt.username = username) {
      next();
    } else {
      res.status(403).json({ message:"No access"})
    }
  }
}

module.exports = router;
