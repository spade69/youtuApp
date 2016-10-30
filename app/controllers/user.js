// import model file  and crypto module,it's used to generate hash value to encode password
var mongoose=require('mongoose');
var User=mongoose.model('User');

//signup

//signin app.post('/signin'
exports.signin=function(req,res){
		//var _user=req.body.username;
		var username=req.body.username;
		var password=req.body.password;
		var loginUser=new User({
			name:username,
			password:password,
		});
		User.findOne({username:username},function(err,user){
			if(err){
				console.log(err);
			}
			if(!user){
				console.log("no user named this");
				return res.json({msg:'no username match!',result:1});
			}
			user.comparePassword(password,function(err,isMatch){
				if(err){
					console.log(err)
				}
				if(isMatch){
					console.log('Password is matched!');
					return res.json({msg:'username match!',result:0});
				}else{
					console.log('Password is not match');
					return res.json({msg:'password is not matched',result:2});
				}
			})
		})
	
}