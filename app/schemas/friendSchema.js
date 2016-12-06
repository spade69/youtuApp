var mongoose=require('mongoose');
var Schema=mongoose.Schema;
//获取Collection中每个文档(也可以叫做对象)的ID
//每个schema都会默认配置这个ObjectID
var ObjectId=Schema.Types.ObjectId;

var friendSchema=new mongoose.Schema({
    user:{type:ObjectId,ref:'User'}
    meta:{
            createAt: {
                type: Date,
                default: Date.now()
            },
            updateAt: {
                type: Date,
                default: Date.now()
            }
        }    
})