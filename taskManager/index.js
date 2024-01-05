
const express  = require("express");
require("./src/db/mongoose");
const Task = require("./src/models/tasks")
const User = require("./src/models/user")
const app  = express();
const Router = require("./routes/user");
//  this wilbe used as middle ware in the get request 
const auth  = require("./src/middleWare/auth")



// TODO :  this is used to parse the incoming json to a object
app.use(express.json());

// ! :  registering the userRouter in the main server
app.use(Router);

// ! for maintanace mode

// app.use((req , response , next)=>{
//     // if(req.method === "GET"){
//     //     response.send("Get requests are disabled");
//     // }
//     // else{
//     //     next();
//     // }
//     response.status(503).send("Site is under maintanence!!");
// })



// todo``````````````````````````````````````````````````````````````````````````````````````
// ``````````````````````````````````````````````````````````````````````````````````````
// *``````````````````````````````````````````````````````````````````````````````````````

app.get("/alltaskslist"  , auth,  async(request , response)=>{
    try{
        // const data = await Task.find({ owner : request.user._id}); or we can 
        await request.user.populate({
            path : "myTasks",
            options : {
                limit : 3,
            }
        });
        response.send(request.user.myTasks);
    }
    catch(error){
        response.send({"error" : "wtf "});
    } 
})
 

app.post("/addtasks", auth, async(request , response)=>{
    // const currentTask = new Task(request.body); (old one)
    // * new onw  :  request.user is the current user coming form the auth middle ware
    const currentTask = new Task({
        ...request.body , owner : request.user._id,
    })
    try{
        await currentTask.save();
        response.status(200).send(currentTask);
    }
    catch(error){
        console.log(error);
        response.status(500).send(error);
    }
})


app.delete("/task/deleteone/:id" , auth, async(request , response)=>{
    try{
        const id = request.body._id;
        console.log(id , "and" ,);
        await Task.findByIdAndDelete({_id : request.params.id, owner : request.user._id});
    }   
    catch(error){
        console.log("deete")
    }

})



app.post("/task/updateone/:id" , auth, async(request , response)=>{
    try{
        const updatedData = request.body;
        let newTask = await Task.findByIdAndUpdate({_id : request.params.id , owner : request.user._id}, updatedData);
        newTask.save();
        response.send(updatedData);
    }
    catch(error){
        console.log("deete")  
    }
  
})

app.listen( 4000 , ()=>{
    console.log("connected and listening")
})  



