const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/TaskManager-api");




// * this is a model
// const User = mongoose.model("User" , {
//     name : {
//         type : String,
//     }, 
//     age : {
//         type : Number,
//     }
// })

// ! making a new user - this is a "model instance"
// const me = new User({
//     name : "Ankit Chauhan ji" ,
//     age : "90"
// })


// me.save().then((e)=>{
//     console.log("This is : " , me);
// }).catch((error)=>{
//     console.log("Error :" , error);
// }) 


//  todo :  making my own model and testing my work

// const Student = mongoose.model("student", {
//     name: {
//         type: String,
//         required : true,
//     },
//     age : {
//         type : Number,
//         required : true,
//         validate(value){
//             if(value<=0){
//                 throw new Error("Age must be greater than zero")
//             }
//         }
//     },
//     previousSchool : {
//         type : String,
//         required : true,
//     },
//     lastYearPercentage : {
//         type : Number,
//         required : true,
//         min : 0,
//         max : 100
//     },
//     enrolledAt : {
//         type : Date,
//         default : Date.now,
//     }
// })

// creating a new student instance

// const ankit = new Student({
//     name : "Ankit Chauhan",
//     age : "22",
//     previousSchool : "MBGPG college Haldwani",
//     lastYearPercentage : 66,
// })

// const manish = new Student({
//     name : "Manish Chauhan",
//     age : "21",
//     previousSchool : "MBGPG college Haldwani",
//     lastYearPercentage : 89,
// })


// ankit.save().then(()=>{
//     console.log("Data saved")
// }).catch((error)=>{
//     console.log("Error : " , error);
// })

// manish.save().then(()=>{
//     console.log("Data saved")
// }).catch((error)=>{
//     console.log("Error : " , error);
// })









