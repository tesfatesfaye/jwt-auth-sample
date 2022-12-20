const mongoose=require('mongoose')

const User=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type: String,required:true},
    quote:{type:String}
}
    ,{collection:'userdata'}
)


const user= mongoose.model("UserData",User)
module.exports=user