const mongoose = require('mongoose');
const {Schema} = mongoose;

const experienceSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    company:{
        type:String,
        required:true
    },
    position:{
        type:String,
        required:true
    },
    experience:{
        type:String,
        required:true
    },
    author:{
        type:Schema.Types.ObjectId,
        ref:"user"
    },
    comments:[{
        type:Schema.Types.ObjectId,
        ref:"comment"
    }]
})

const experience = mongoose.model('experience',experienceSchema);
module.exports = experience;