const {ObjectId,MongoClient} = require('mongodb');
//const url = 'mongodb://localhost:27017';
const url = 'mongodb+srv://GCH0805-Cuong:23122001@cluster0.beaea.mongodb.net/test';

async function getDB() {
    const client = await MongoClient.connect(url);
    const dbo = client.db("PetShop");
    return dbo;
}

async function InserToy(newToy){
    const db = await getDB();
    await db.collection("toys").insertOne(newToy);
}
async function DeleteToy(id){
    const db = await getDB();
    await db.collection("toys").deleteOne({_id:ObjectId(id)});
}
async function UpdateToy(id, nameInput,imageInput,priceInput) {
    const filter = { _id: ObjectId(id) };
    const newValue = { $set: { name: nameInput,image: imageInput,price:priceInput } };

    const dbo = await getDB();
    await dbo.collection("toys").updateOne(filter, newValue);
}
async function getToyID(id) {
    const dbo = await getDB();
    const e = await dbo.collection("toys").findOne({ _id: ObjectId(id) });
    return e;
}
module.exports = {getDB,InserToy,DeleteToy,getToyID,UpdateToy};