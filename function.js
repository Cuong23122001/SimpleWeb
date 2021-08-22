const {ObjectId,MongoClient} = require('mongodb');
//const url = 'mongodb://localhost:27017';
const url = 'mongodb+srv://GCH0805-Cuong:23122001@cluster0.beaea.mongodb.net/test';

async function getDB() {
    const client = await MongoClient.connect(url);
    const dbo = client.db("PetShop");
    return dbo;
}

async function InserPet(newPet){
    const db = await getDB();
    await db.collection("toys").insertOne(newPet);
}
async function DeletePet(id){
    const db = await getDB();
    await db.collection("toys").deleteOne({_id:ObjectId(id)});
}
async function UpdatePet(id, nameInput,imageInput,priceInput) {
    const filter = { _id: ObjectId(id) };
    const newValue = { $set: { name: nameInput,image: imageInput,price:priceInput } };

    const dbo = await getDB();
    await dbo.collection("toys").updateOne(filter, newValue);
}
async function getPetID(id) {
    const dbo = await getDB();
    const e = await dbo.collection("toys").findOne({ _id: ObjectId(id) });
    return e;
}
module.exports = {getDB,InserPet,DeletePet,getPetID,UpdatePet};