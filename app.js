const express = require ('express');
const app = express()

const{getDB,InserToy,DeleteToy,getToyID,UpdateToy}=require('./function');
app.set('view engine','hbs')
app.use(express.urlencoded({extended:true}))

app.use(express.static('public'))

app.get('/',async(req,res)=>{
    const dbo = await getDB();
    const allToys = await dbo.collection("toys").find({}).toArray();
    res.render('index',{data:allToys})
})

app.get('/add',(req,res)=>{
    res.render("add");
})
app.post('/addToy',async(req,res)=>{
    const nameInput = req.body.txtName;
    const imageInput = req.body.txtImage;
    const priceInput = req.body.txtPrice;
    const newToy = {name: nameInput,image:imageInput,price:priceInput};

    InserToy(newToy);
    console.log("OK");
    res.redirect('/');
})

app.get('/edit',async(req,res)=>{
    const id = req.query.id;
    const e = await getToyID(id);
    res.render("edit",{toy:e});
})
app.post('/update', async(req,res)=>{
    const nameInput = req.body.txtName;
    const imageInput = req.body.txtImage;
    const priceInput = req.body.txtPrice;
    const id = req.body.txtId;

    UpdateToy(id, nameInput,imageInput,priceInput);
    res.redirect("/");
})

app.get('/delete',async(req,res)=>{
    const id = req.query.id;

    DeleteToy(id);
    res.redirect('/')
})


const PORT = process.env.PORT || 2001;
app.listen(PORT)
console.log("app running is: ",PORT)