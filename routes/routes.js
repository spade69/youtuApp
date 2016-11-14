var user=require('../app/controllers/user');
var check=require('../app/utils/check');
var index=require('../app/utils/index');
//Utils
var url=require('url');
//var querystring=require('querystring');

module.exports=function(app){

var csrf=index.generateRandom(24);
  
  //pre handle user
  app.use(function(req,res,next){
    var _user=req.session.user;
    if(_user){
        app.locals.user=_user;
    }
    return next();
  })
  //index
  app.get('/',function(req,res){
    console.log('user in session: '+req.session.user)
    if(req.session.user)
        console.log(req.session.user.username);
    console.log(req.cookies);//console cookie
    return res.render('index', { title: 'Youtu' });
  });  
  //login page  of MyPage
  //User
  app.get('/user/login',function(req,res){
    req.session.csrf=csrf;
    return res.render('login',{welcome:'Please Login My Friend',title:'Login'});
  })

  app.get('/user/signup',function(req,res){
    return res.render('signup',{welcome:'Please Sign up first,my friend','title':'SignUp','_csrf':csrf});
  })

  app.get('/user/query',function(req,res){
    //var query=querystring.parse(url.parse(req.url).query)
    req.query=url.parse(req.url,true).query;
    console.log(req.query);
  });
  //app.get('/user/signin')

//
  app.get('/test',function(req,res){
    return res.send('fuckyou');
  });

  //user
  //app.post('/reg',check.checkNotLogin);
  app.post('/reg',user.signup);
 // app.post('/signin',check.checkcrf5otLogin);
  app.post('/signin',user.signin);
  app.get('/logout',check.checkLogin);
  app.get('/logout',user.logout);

  //index
  //uploadFile
  app.post('/upload',index.uploadFile);
}