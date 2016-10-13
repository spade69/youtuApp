var mongoose=require('mongoose');
//存字段
var userSchema=new mongoose.Schema({
	doctor:String,
	title:String,
	summary:String,
	flash:String,
	year:Number,
	//
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

userSchema.pre('save',function(next){
	if(this.isNew){
		this.meta.createAt=this.meta.updateAt=Date.now();
	}
	else{
		this.meta.updateAt=Date.now();
	}
	next();
})

//define a object   
userSchema.statics={
	//get alll all data 
	fetch:function(cb){
		return this
		.find({}) 
		.sort('meta.updateAt')//sort by update time
		exec(cb)
	},
	findById:function(id,cb){
		return this
		.findOne({_id:id}) //one item
		exec(cb)
	}
}

module.exports=userSchema;