const mongoose = require('mongoose');
const {Schema} = mongoose;

const commentSchema = new Schema({
    body:String,
    person:{
        type:Schema.Types.ObjectId,
        ref:"user"
    }
});

const comment = mongoose.model('comment',commentSchema);

module.exports = comment;