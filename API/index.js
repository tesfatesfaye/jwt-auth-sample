const express= require('express')
const app=express()
const mongoose=require('mongoose')
const cors=require('cors')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
app.use(cors())// cors middleware
app.use(express.json())
mongoose.set('strictQuery', false)
mongoose.connect('mongodb://127.0.0.1:27017/mern-stack-auth',
{ useNewUrlParser:true,
useUnifiedTopology:true}).then(()=>console.log("connected to MongoDb")).catch(console.error)
    const User=require('./models/userModel')
app.post('/api/register',async (req,res)=>{
    console.log(req.body)
    try {
        const newPassword= await bcrypt.hash(req.body.password,10)
        const user=await User.create({
            name:req.body.name,
            email:req.body.email,
            password:newPassword
        })
        user.save()
        res.json({status :'ok'})
    }
    catch (err){
        res.json({status:'error',error:'Duplicate email already exists'})
    }
    
})

app.get('/api/quote', async(req,res)=>{
    const token=req.header['x-access-token']
    try{
    const decoded=jwt.verify(token,'secret123')
        const email=decoded.email
        const user=await User.findOne({email:email})
        return res.json({status:'ok', quote:user.quote})
} catch(error){
        console.log(error)
        res.json({status:'error', error: 'invalid token'})
}

})

app.post('/api/quote', async(req,res)=>{
 const token = req.headers['x-access-token']
 // you have to figure out how to do this
 try {
    const decoded = jwt.verify(token, 'secret123')
    const email = decoded.email
    await User.updateOne(
        { email: email },
        { $set: { quote: req.body.quote } }
    )

    return res.json({ status: 'ok' })
    } 
    catch(error){
        console.log(error)
        res.json({status:'error', error: 'invalid token'})
    }

})


app.post('/api/login',async(req,res)=>{
    const user=await User.findOne({
        email:req.body.email,
        
    })
        if(!user){return res.json({status:'error', error: 'Invalid login'})}
         
        const isPasswordValid=await bcrypt.compare(req.body.password, user.password)
    if(isPasswordValid){
       
        const token=jwt.sign({
            name:user.name, // req.body.name would also work but for the sake of consistency 
            email:user.email // req.body.email would work also
        }, 'secret123')
        return res.json({status:'okay', user:token})
    }
    else{
        return res.json({status:'error, user:false'})
    }
})



app.listen(3002,()=>{
    console.log('Server running on port 3002')
})