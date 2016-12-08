var mongoose=require('mongoose');
var Schema=mongoose.Schema;
//获取Collection中每个文档(也可以叫做对象)的ID
//每个schema都会默认配置这个ObjectID
var ObjectId=Schema.Types.ObjectId;

var friendSchema=new mongoose.Schema({
    user:{type:ObjectId,ref:'User'},
    favorite:Boolean,
    friend:[String], //联系人列表数组
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
})；

//每次POST存数据数据库save方法。 之前调用
friendSchema.pre('save',function(next){
    var friend=this;
    //Document#isNew
    if(this.isNew){ //当前document是否new
        this.meta.createAt=this.meta.updateAt=Date.now();
    }else{
        this.meta.updateAt=Date.now();
    }
});

//静态方法
friendSchema.statics={
    //get alll all data 
    fetch:function(cb){
        return this
        .find({}) 
        .sort('meta.updateAt')//sort by update time
        .exec(cb)
    },
    findById:function(id,cb){
        return this
        .findOne({_id:id}) //one item
        .exec(cb)
    }
}

module.exports=friendSchema;