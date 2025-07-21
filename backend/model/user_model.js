const mongooose = require('mongoose')

const userSchema = mongooose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,

    },
    password:{
        type:String,
        required:true,
        select:false
    },
    token:{
        type:String,
        
    }
})

const User = mongooose.model('User',userSchema)

module.exports = {
    User
}