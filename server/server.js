const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongo-db-connection');
var {User} = require("./db/model/user");

var app = express();
app.use(bodyParser.json());

app.get('/users', (req, res)=>{
    User.find().then((data)=>{
        res.send({data})
    }, 
    (err)=>{
        res.status(400).send(e);
    })
});

app.post("/users", (req, res)=>{
    var user = new User({
        name: req.body.name,
        phone:req.body.phone,
        address:req.body.address
    });

    user.save().then((data)=>{
        console.log("User data saved successfully");
        res.send(data);
    },
    (err)=>{
        console.log("Error in saving User data");
        res.status(400).send();
    });
});

app.get("/users/:id", (req, res)=>{

    var id = req.params.id;
    if(!ObjectID.isValid(id)){
        console.log("No user found");
       return res.status(404).send();
    }

    User.findById(id).then((data)=>{
        if(!data){
           return res.status(404).send();
        }
        console.log(data);
        res.send(data);
    }, (e)=>{
        console.log("Erroro found");
       return res.status(400).send(e);
    });
})

app.delete("/users/:id", (req, res)=>{
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
        console.log("Invalid Id for DELETE operation");
        return res.status(404).send();
    }

    User.findByIdAndRemove(id).then((user)=>{
        if(!user){
            console.log("No user found for given Id for DELETE")
            return res.status(404).send();
        }
         console.log("Delete successful, deleted user: "+user);
         res.send(user);
    },
    (error)=>{
        console.log("Error while deleting user");
        res.status(400).send();
    });
});

app.listen(3000, ()=>{
    console.log("Server started on port no 3000")
})