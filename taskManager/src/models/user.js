const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid Email!");
            }
        },
    },
    password: {
        type: String,
        required: true,
    },
    tokens : [{
        token : {
            type : String,
            required : true,
        }
    }]
});


// virtual property

userSchema.virtual("myTasks" , {
    ref : 'tasks',
    localField : "_id",
    foreignField : "owner"
})

userSchema.methods.getpublicProfile = async function(){
    const user  = this;
    // this toObject is provided by the mongoose
    const userObj = user.toObject();
    delete userObj.password;
    delete userObj.tokens;
    console.log(userObj);
    return userObj;
}

userSchema.methods.generateAuthToken = async function (){
    const user = this;

    // this will be used in future as 
    // * jwt.verify( " the extracted token " , thisismyfirstMERNapp)
    // ! also we have proved this with _id which we will use in the future!! 
 
    const token = jwt.sign({_id :  user._id.toString()} , "thisismyfirstMERNapp");
    user.tokens = user.tokens.concat({token});
    await user.save();
    return token;
}

 
userSchema.statics.findByCredentials = async function (email, password) {
    const user = await this.findOne({ email });
    if (!user) {
        throw new Error('User not found');
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error('Invalid password');
    }
    return user;
};




userSchema.pre("save", async function (next) {
    const user = this;

    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 8);
    } 

    next();
});

const Users = mongoose.model("users", userSchema);

module.exports = Users;
