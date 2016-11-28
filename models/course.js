var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var courseSchema = new Schema(
    {
        code:     {type: String, required: true, unique: true},
        posts: {type: [{
            id: {type: Number, required: true, unique: true},
            text: {type: String, required: true},
            author: {type: String, required: true},
            date: {type: Date, required: true}
        }], required: true, default: []},
        archived: {type: [{
            id: {type: Number, required: true, unique: true},
            text: {type: String, required: true},
            author: {type: String, required: true},
            date: {type: Date, required: true}
        }], required: true, default: []},
        tutors: {type: [String], required: true, default: []},
        students: {type: [String], required: true, default: []}
    },
    {
        collection: 'courses'
    }
);

module.exports = mongoose.model('Course', courseSchema);
