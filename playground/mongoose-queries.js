const {ObjectID} =  require('mongodb');
const { User } = require('./../server/db/model/user');
const { mongoose } = require('./../server/db/mongo-db-connection');

var id = "";
if(!ObjectID.isValid(id)){
    return console.log('ID not valid');
}
User.findById(id).then((user) => {
    if (!user) {
        console.log('User Not found')
    }
    console.log(user);
});