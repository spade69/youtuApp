
//we render our pages in route  
/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});*/
// import model file  and crypto module,it's used to generate hash value to encode password
/*
var mongoose=require('mongoose');
      //User=require('../models/user.js');
var User=mongoose.model('User');

module.exports = function(app){
	//pre handle user
	app.use(function(req,res,next){
		var _user=req.session.user;
		if(_user){
			app.locals.user=_user;
			next();

		}
		return next();
		
	})
	

	app.get('/',function(req,res){
		console.log('user in session: ')
		console.log(req.session.user);
		 res.render('index', { title: 'Youtu' });
	});
	app.get('/users',function(req,res){
		res.send("fuckyou");
	});

	app.post('/reg',function(req,res){
		var username=req.body.username,
		      password=req.body.password;
		var newUser=new User({
			name:username,
			password:password,
			email:req.body.email
		});
		//检查用户是否已经存在
		User.get(newUser.name,function(err,user){
			var jsonObj={};
			if(err){
				req.flash('error',err);
				return res.json({msg:'error',result:1});
				//return res.redirect('/');//重定向到主页
				
			}
			if(user){
				//res.json({msg:'duplicated'});
				req.flash('error','user already exist');
				console.log("duplicated");
				return res.json({msg:'duplicated',result:2});
				
			}
			//if not exist then add new user
			
			newUser.save(function(err,user){
				if(err){
					req.flash('error',err);
					console.log("msg error~!");
				}
				//req.session.user=newUser;
				//res.send('sucess');
				return res.json({msg:'success',result:0});
		
			});
			
		});
	});

	//sign in 
	
};
*/