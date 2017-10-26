const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
var mpromise = mongoose.connect('mongodb://localhost:27017/UsersApp', {useMongoClient:true});

mpromise.then((db)=>{
    console.log('Connected');
},
(err)=>{
    console.log('Error in connection');
});

module.exports = {mongoose}
