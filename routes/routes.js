var user=require('../app/controllers/user');
var check=require('../app/utils/check');
module.exports=function(app){
  
  //pre handle user
  app.use(function(req,res,next){
  	var _user=req.session.user;
  	if(_user){
  		app.locals.user=_user;
  		next();
  	}
  	return next();
  })
  //index
  app.get('/',function(req,res){
	console.log('user in session: ')
	console.log(req.session.user);
	return res.render('index', { title: 'Youtu' });
  });  
  //login page 
  app.get('/login',function(req,res){
    return res.render('login',{welcome:'Please Login My Friend',title:'Login'});
  })

  app.get('/test',function(req,res){
  	return res.send('fuckyou');
  });

  //user
  //app.post('/reg',check.checkNotLogin);
  app.post('/reg',user.signup);
 // app.post('/signin',check.checkNotLogin);
  app.post('/signin',user.signin);
  app.get('/logout',check.checkLogin);
  app.get('/logout',user.logout);
}