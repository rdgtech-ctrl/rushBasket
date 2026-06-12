import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        unique:true
    }
})

const userModel = mongoose.models.user || mongoose.model('user',userSchema);
// checks if the model already exists if not then || creates a new model

export default userModel;