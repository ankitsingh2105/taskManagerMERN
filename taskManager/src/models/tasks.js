const mongoose = require("mongoose");;
const userSchema  = new mongoose.Schema({
    nameoftask : {
        type : String,
        required : true,
    },
    timeOfCreation : {
        type : String,
        default : new Date
    },
    description : {
        type : String,
        required : true
    },
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        required  : true,
        // todo : this is used to refernce this object field with the "User" model
        ref : "User"
    }
})
const Tasks = mongoose.model("tasks" , userSchema);

module.exports = Tasks
