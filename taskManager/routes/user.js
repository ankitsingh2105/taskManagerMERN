const express = require("express");
const router = new express.Router();
const User = require("../src/models/user");
const app = express();
const auth = require("../src/middleWare/auth")
app.use(router);


router.post("/user/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const newUser = new User({
            name: name,
            email: email,
            password: password,
        });
        await newUser.save();
        const token = await newUser.generateAuthToken();
        res.status(200).send({ newUser, token });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send({ error: "Internal Server Error" });
    }
});

router.post("/user/login", async (req, res) => {
    let user = req.body;
    try {
        const newUser = await User.findByCredentials(user.email, user.password);
        // ! methods are used to define instance methods, isliye newUser.generateAuthToken() not User.
        const token = await newUser.generateAuthToken();
        const publicProfile = await newUser.getpublicProfile();
        res.send({ publicProfile, token });
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).send({ error: "Internal Server Error" });
    }
});

router.post("/user/logout", auth, async (request, response) => {
    console.log("this is the user logging out this time : ", request.user);
    try {
        request.user.tokens = request.user.tokens.filter((token) => {
            return token.token !== request.tokenvaa;
        })
        response.send(request.user);
    }
    catch (e) {
        response.status(500).send(request.user);
    }
})
router.post("/user/logout/allsessions", auth, async (request, response) => {
    try {
        request.user.tokens = [];
        await request.user.save();
        response.send(request.user);
    }
    catch (e) {
        response.status(500).send(request.user);
    }
})

router.get("/user/me", auth, async (request, response) => {
    const publicProfile = await request.user.getpublicProfile();
    //! this request.user is coming from the auth middleware
    response.send(publicProfile);
})

router.delete("/user/delete", auth, async (req, res) => {
    try {
        await req.user.deleteOne();
        // await req.user.remove();
        res.send("removed");
    }
    catch (error) {
        res.status(500).send("error");
    }
})

module.exports = router; 