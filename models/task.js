const { model, Schema } = require('mongoose')

const taskSchema = new Schema({
    title:String,
    description:String,
    status:{
        type:String,
        default:'open'
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User'
    }
})

module.exports = model('Task',taskSchema)