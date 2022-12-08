//***Configuration .env
require('dotenv').config();
//console.log(process.env.SECRET_MESSAGE);
//***Connexion au serveur et création router
const express=require('express');
const app=express();
const PORT =3000;
app.listen(PORT,()=>{console.log('server on port',PORT)});
app.use(express.json())
const router=express.Router();
//***Connexion à la base de donnée locale 
const mongoose=require("mongoose");
mongoose.connect(process.env.URI,()=>{console.log('database connected !')}, err=>{console.error(err)});
const db=mongoose.connection;
db.on('Erreur :', (err)=>console.err(err))
db.once('La base de donnée est :', ()=>console.log('connectée'));
//***Création de schéma
//const user = require("./models/Users")
const userSchema= new mongoose.Schema (
    {   name: { type: String, required: true },
        career: String,
        age: Number,  
        date: {type: Date.now}      
    });
mongoose.model('user',userSchema);
//***GET
router.get('/Server', async(req,res)=>{
try {
    const allUsers = user.find();
    res.json(allUsers);
}
catch (err) {res.status(500).json({message:err.message})}
})
//***POST
router.post('/Server',async(req,res)=>{
    const newUser=new user({name: req.body.name, career: req.body.career ,age: req.body.age});
    try {
        const thenewUser=newUser.save();
        res.status(201).json(thenewUser);
    }
    catch (err) {res.status(400).json({message:err.message})}
    })

//*** Vérifier si le user existe 
async function isUserHere(req,res,next)
{    let isUser
    try {
        let isUser=user.findById(req.params.id)    
        if (isUser==null) {return res.status(404).json({message:'Not Found'})}
             }  
        catch (err) {res.status(500).json({message:err.message})} 
res.isUser=isUser;
next()
}

//***update 
router.patch('/Server:id',isUserHere,(req,res)=>{    
    try {
       const updaterUser= res.user.update({name:req.body.name,career:req.body.career}).save();
       res.json(updaterUser)
    } 
    catch (err) {res.status(500).json({message:err.message})}
})
//***Delelte
router.delete('/Server:id',isUserHere,(req,res)=>{   
    try {
        res.user.remove()
        res.json({message:'User supprimé'})
    } 
    catch (err) {res.status(500).json({message:err.message})}
})
