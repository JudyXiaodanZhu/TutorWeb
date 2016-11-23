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
        friends: [String],
        posts: {
            type: [{
                subject: {type: String, required: true},
                title: {type: String, required: true},
                detail: {type: String, required: true},
                when: {type: String, required: true},
                date: {type: Date, required: true}
            }]
        }
    },
    {
        collection: 'users'
    }
);

mongoose.connect('mongodb://localhost/usersdb');
module.exports = mongoose.model('User', userSchema);
