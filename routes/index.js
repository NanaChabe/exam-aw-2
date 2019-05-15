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
};

exports.star = function(req, res) {
  res.send(toto);
};

//relate a event to a jquery function for filter results
exports.search = function(req, res) {
  res.send(toto);
};

//relate a event to a jquery function for restart results
exports.restart = function(req, res) {
  console.log(toto);
  res.send(toto);
};

//relate a event to a jquery function for show all information
exports.show = function(req, res) {
  res.send(toto);
};

//relate a event to a jquery function for close all information
exports.close = function(req, res) {
  res.send(toto);
};
