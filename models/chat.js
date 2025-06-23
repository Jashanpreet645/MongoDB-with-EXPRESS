const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

const chatSchema = new Schema({
    from:{
        type:String,
        required:true
    },
    to:{
        type:String,
        required:true
    },
    msg:{
        type:String,
        maxLength:500
    },
    created_at:{
        type:Date,
        required:true
    }
});

const Chat = model("Chat", chatSchema);
module.exports = Chat;