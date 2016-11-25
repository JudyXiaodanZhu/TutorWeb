var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema(
    {
        username: {
            type: String, required: true, unique: true
        },
        password: {
            type: String, requried: true
        },
        type: {
            type: String, requried: true
        },
        online: {
            type: Boolean, required: true, default: 0
        },
        courses: [String],
        friends: [String]
    },
    {
        collection: 'users'
    }
);

mongoose.connect('mongodb://localhost/usersdb');
module.exports = mongoose.model('User', userSchema);
