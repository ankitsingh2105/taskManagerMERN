const express = require("express");
const router = express.Router();  // Use express.Router() to create a router instance
const auth = require("../src/middleWare/auth");
const Task = require("../src/models/tasks");

router.get("/alltaskslist", auth, async (request, response) => {
    try {
        await request.user.populate({
            path: "myTasks",
            options: {
                limit: 33,
            }
        });
        response.send(request.user.myTasks);
    } catch (error) {
        response.send({ "error": "wtf " });
    }
});

router.post("/addtasks", auth, async (request, response) => {
    const currentTask = new Task({
        ...request.body, owner: request.user._id,
    });
    try {
        await currentTask.save();
        response.status(200).send(currentTask);
    } catch (error) {
        console.log(error);
        response.status(500).send(error);
    }
});

router.delete("/task/deleteone/:id", auth, async (request, response) => {
    try {
        await Task.findByIdAndDelete({ _id: request.params.id, owner: request.user._id });
    } catch (error) {
        console.log("deete");
    }
});

router.post("/task/updateone/:id", auth, async (request, response) => {
    try {
        const updatedData = request.body;
        let newTask = await Task.findByIdAndUpdate({ _id: request.params.id, owner: request.user._id }, updatedData);
        newTask.save();
        response.send(updatedData);
    } catch (error) {
        console.log("deete");
    }
});

module.exports = router;
