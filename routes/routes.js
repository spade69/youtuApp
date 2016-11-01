var user=require('../app/controllers/user');

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
	res.render('index', { title: 'Youtu' });
  });   

  app.get('/test',function(req,res){
  	res.send('fuckyou');
  });

  //user
  app.post('/signin',user.signin);
  app.post('/reg',user.signup);
  app.get('/logout',user.logout);
}