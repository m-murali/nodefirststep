const mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: Number
    },
    dob: {
        type: Date,
        default: Date.now
    },
    address: {
        type: String,
        required: false
    }
});

var User = mongoose.model("user", userSchema);
module.exports = {User}