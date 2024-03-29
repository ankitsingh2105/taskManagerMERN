const mongodb = require("mongodb");
const {ObjectId , MongoClient} = require("mongodb");

const id = new ObjectId();

// todo : inserting data to the database

async function connectAndInsert() {
    const connectionURL = 'mongodb://127.0.0.1:27017';
    const client = new mongodb.MongoClient(connectionURL);
 
    try {
        await client.connect();
        console.log("Connected Successfully");

        const db = client.db("taskManager");

        await db.collection("user").insertMany([
            {
                name : "anku"
            },
            {
                name : "anku"
            }
        ])

    } catch (error) {
        console.log("Error:", error);
    }
}

// connectAndInsert();



//  todo : reading data from the database

const readData = async() =>{
    const connectionURL = "mongodb://127.0.0.1:27017";
    const client = new mongodb.MongoClient(connectionURL);

    try{
        await client.connect();
        console.log("connected successfully for reading data");

        const db = client.db("taskManager");

        let result  = await db.collection("user").find({
            name : "anku"
        }).toArray();

        result  = result.filter((e)=>{
            return e.age<230;
        })

        result.forEach((e)=>{
            console.log(e);
        })

    }
    catch(e){
        console.log("Error : " , e);
    }

}
// readData();


// todo : Updating the data from the database

const updateDataBase =  async() =>{
    const connectionURL = "mongodb://127.0.0.1:27017";
    const client = new mongodb.MongoClient(connectionURL);

    try{
        await client.connect();
        console.log("We are connected for updating docs in the database");

        const db = client.db("taskManager");

        await db.collection("user").updateMany({
            name : "to new Anku"
        } , {
            $set:{
                name : "updateMany"
            }
        })
    }
    catch(error){
        console.log(("Error : " , error));
    }
}

// updateDataBase();

const deleteData = async() =>{
    const connectionURL = "mongodb://127.0.0.1:27017";
    const client = new mongodb.MongoClient(connectionURL);

    try{
        await client.connect();
        console.log("We are connected for updating docs in the database");

        const db = client.db("taskManager");

        let result  = await db.collection("user").deleteMany({
            name : "anku",
        })

        if (result.deletedCount > 0) {
            console.log(`${result.deletedCount} document(s) deleted successfully`);
        } else {
            console.log("No documents matching the deletion criteria were found");
        }
    }
    catch(error){
        console.log("Error : " , error);
    }
}
// deleteData();
 