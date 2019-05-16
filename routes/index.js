//create a varible for manipulate axios objects
const axios = require('axios');

//variable for sabe result of api request
var toto;
axios.get('https://randomuser.me/api/?results=12')
  .then(response => {
    //asign value of results
    toto = response.data.results;
  })
  .catch(error => {
    console.log(error);
  });

//function for load page
exports.index = function(req, res) {
  res.render('home',{newsi: JSON.stringify(toto)});
  //res.render('home');
};

exports.variables = function(req, res) {
  res.send(toto);
};
