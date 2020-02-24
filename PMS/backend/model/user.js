const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt=require('bcryptjs')

let userSchema = new Schema({
    projectId:[{
        type:mongoose.Schema.Types.String,
        ref:'project.id', 
        required:false
    }],
    id: {
        type: Number, 
        required: "Id required",
        unique:true
    },
    name: {
        type: String, 
        required: "Name required",
    }, 
    mobile_number:{
        type:Number, 
        required:"Contact required",
        unique:true
    }, 
   email:{
       type:String,
       required:"Email required",
       unique:true
   },
   username:{
       type:String,
       required:"Username required",
       unique:true
   },
   password:{
       type:String,
       required:"Password required",
       minlength: [6, "Password must be 6 character long"]
   }, 
   role:{
        type:String,
        required:true
   },
    status:{
        type:String,
        required:true
    }
});

// userSchema.pre('save', function (next) {
//     var user = this;
//     if (!user.isModified('password')) {return next()};
//     bcrypt.hash(user.password,10).then((hashedPassword) => {
//         user.password = hashedPassword;
//         next();
//     })
// }, function (err) {
//     next(err)
// })

module.exports=mongoose.model('user', userSchema);