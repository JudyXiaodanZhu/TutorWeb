var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var courseSchema = new Schema(
    {
        code:     {type: String, required: true, unique: true},
        posts: [{
            text: {type: String, required: true},
            author: {type: String, required: true},
            date: {type: Date, required: true}
        }],
        archived: [{
            text: {type: String, required: true},
            author: {type: String, required: true},
            date: {type: Date, required: true}
        }],
        tutors: [String],
        students: [String]
    },
    {
        collection: 'courses'
    }
);

module.exports = mongoose.model('Course', courseSchema);
