const jwt = require("jsonwebtoken");
const Users = require("../models/user")
const auth  = async(req , res , next)=>{
    try{
        const token  = req.header("Authorization").replace("Bearer " , ""); 
        const decoded = jwt.verify(token , "thisismyfirstMERNapp");
        const user = await Users.findOne({_id : decoded._id , "tokens.token" : token})
        if(!user){
            throw new Error();
        }
        // !so that the app.get dont have to search the user again
        req.tokenvaa = token;
        req.user = user;
        next();
    }
    catch(error){
        res.status(401).send({error : "Please authenticate"});
    }
}  
 
module.exports = auth ;