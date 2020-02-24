const mongoose=require('mongoose');
const Schema = mongoose.Schema;

let projectSchema = new Schema({
    managerId:{
        type:mongoose.Schema.Types.String,
        ref:'user.id'
    },
    id:{
        type:Number,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    team_member:{
        type:Number,
        required:true
    },
    scrum_master:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    }
});

module.exports=mongoose.model('project', projectSchema);

