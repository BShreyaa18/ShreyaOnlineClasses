const express=require("express")
const path=require("path")
const fs =require("fs")
const port=80;
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/contactDance', {useNewUrlParser: true});
const app=express();
const bodyparser=require("body-parser")

var contactSchema = new mongoose.Schema({
    name: {type : String, required : true},
    phone: {type : String, required : true},
    email: {type : String, required : true},
    address :String,
    desc: {type : String, required : true}
    
  });
var informSchema = new mongoose.Schema({
    name : {type : String, required : true},
    desc : {type : String, required : true},
})

var Contacts = mongoose.model('contact', contactSchema);
var Information = mongoose.model('Inform', informSchema);

//For serving static files
app.use('/static',express.static('static'))
app.use(express.urlencoded())

//Pug specific stuff
app.set('view engine','pug') //Set the view engine as pug
app.set('views',path.join(__dirname,'views')) //Set the views directory

app.get('/',(req,res)=>{
    
    res.status(200).render('home.pug')
})
app.get('/contacts',(req,res)=>{
    
    res.status(200).render('contacts.pug')
})
app.get('/ContactUs',(req,res)=>{
    
    res.status(200).render('ContactUs.pug')
})
app.get('/AboutUs',(req,res)=>{
    
    res.status(200).render('AboutUs.pug')
})
app.post('/contacts', (req, res)=>{
    var {name,phone,email,address,desc} = req.body;
    Contacts({
        name:name,
        phone:phone,
        email:email,
        address:address,
        desc:desc,
    }).save().then(()=>{
    res.send('This item has been saved to the database')
    }).catch(()=>{
    res.status(400).send('item was not saved to the database')});
})
app.post('/ContactUs', (req, res)=>{
    var {name,desc} = req.body;
    Information({
        name:name,
        desc:desc,
    }).save().then(()=>{
    res.send('Feedback Recorded')
    }).catch(()=>{
    res.status(400).send('Feedback not saved successfully')});
})

app.listen(port,()=>{
    console.log(`The application started successfully on port ${port}`);
})