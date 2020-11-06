const { model, Schema } = require('mongoose'),
      { isEmail } = require('validator')
      bcrypt = require('bcryptjs')

const userSchema = new Schema({
    email:{
        type:String,
        required:[true,'Email can not be empty'],
        unique:true,
        validate:[isEmail,'Please enter a valid email']
    },
    password:{
        type:String,
        required:[true,'Password can not be empty'],
        minlength:[6,'Password must be at least 6 chatacter long']
    }
})

userSchema.pre('save',async function(next){
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash
    next()
})

module.exports = model('User',userSchema)