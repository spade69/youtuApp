var mongoose=require('mongoose'); //mongoose 对monggodb建模
var bcrypt=require('bcrypt');
var SALT_WORK_FACTOR=10;
//存字段
var userSchema=new mongoose.Schema({
	age:Number,
	email:{
		unique:true,
		type:String
	},
	username:{
		unique:true,
		type:String
	},
	password:String,
	gender:String,
	constellation:String,
	phoneNumber:{
		unque:true,
		type:Number
	},
	signature:String,
	hometown:String,
	fansNumber:Number,
	profession:String,
	post:String,
	interests:String,
	location:String,	
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
// 每次存数据之前都会调用这个方法,经过编译后，在model中才会有这个方法
userSchema.pre('save',function(next){
	var user=this;
	if(this.isNew){
		this.meta.createAt=this.meta.updateAt=Date.now();
	}
	else{
		this.meta.updateAt=Date.now();
	}
	bcrypt.genSalt(SALT_WORK_FACTOR,function(err,salt){
		if(err) return next(err)

			bcrypt.hash(user.password,salt,function(err,hash){
				if(err) return next(err);

				user.password=hash;
				next();
			})
	})

})

userSchema.methods={
	comparePassword:function(_password,cb){
		bcrypt.compare(_password,this.password,function(err,isMatch){
			if(err) return cb(err);
			cb(null,isMatch);
		})
	}
}

//define a object   
userSchema.statics={
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
  
module.exports=userSchema;