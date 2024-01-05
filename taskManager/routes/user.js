const express = require("express");
const router = new express.Router();
const User = require("../src/models/user");
const app = express();
const auth = require("../src/middleWare/auth")
const multer = require("multer");
const sharp = require("sharp");
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
        res.send("removed");
    }
    catch (error) {
        res.status(500).send("error");
    }
})

// * defining the destination folder 

const upload = multer({
    // todo:  dest : "avatarImage",  
    // !removing this so that the multer gives us the data so that we can so something whith it
    // !other wise it was saving data in the avatarImage folder, we will do something in the router we defined below
    limits : {
        // 1000000 bytes = 1mega bytes, restricting the file size to 1 mb
        fileSize : 1000000
    },
    //  cb = callback
    fileFilter(request , file , cb){

        const allowedExtensions = [".jpg", ".jpeg", ".png"];
        // todo : some method check if any one element in the array passes the test!!
        // * this will check if the ends with string is of "any" valid type
        if(!allowedExtensions.some((fileType) => file.originalname.endsWith(fileType))){
            return cb(new Error("allowed extensios are jpg , jpeg , png"));
        }

        // todo : if everything is fine we will accept the file : 
        cb(undefined , true);

        // ! we have 3 options
        // cb(new Error("File must be an image"));
        // cb(undefined , true);
        // cb(undefined , false);

    }
})

router.post("/user/me/avatar" , auth, upload.single("avatar") , async(request , response)=>{
    const currentUser = request.user  //* geetting from the auth middleWare
    currentUser.avatar = request.file.buffer;
    await currentUser.save();
    response.send(currentUser);
},
(error , request , response , next)=>{
    response.status(401).send({error : error.message})
}
// todo : this is used to put an json error response, insted of html moreover this has to look like this only
)



router.delete("/user/me/avatar/delete" , auth , async(request , response)=>{
    const currentUser = request.user;
    currentUser.avatar = "";
    await currentUser.save();
    response.send("deleted the image");
})


module.exports = router; 