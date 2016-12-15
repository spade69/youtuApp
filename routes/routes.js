var user=require('../app/controllers/user');
var friend=require('../app/controllers/friend');
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
  app.get('/signin',function(req,res){
    req.session.csrf=csrf;
    return res.render('login',{welcome:'Please Login My Friend',title:'Login'});
  })

  app.get('/reg',function(req,res){
    return res.render('signup',{welcome:'Please Sign up first,my friend','title':'SignUp','_csrf':csrf});
  })

  app.get('/query',function(req,res){
    //var query=querystring.parse(url.parse(req.url).query)
    req.query=url.parse(req.url,true).query;
    console.log(req.query);
  });
  //app.get('/user/signin')

//
  app.get('/test',function(req,res){
    return res.sendfile('template/index.html');
  });

  //user
  //app.post('/reg',check.checkNotLogin);
  app.post('/user/signup',user.signup);
 // app.post('/signin',check.checkcrf5otLogin);
  app.post('/user/login',user.signin);
  //register two handler to the same api
  app.get('/user/logout',check.checkLogin);
  app.get('/user/logout',user.logout);
  app.get('/user/details',user.query);
  app.post('/user/details',user.details);
  app.delete('/user/details',user.delete);
  
  //Handler in index.js
  //uploadFile
  app.post('/upload',index.uploadFile);

  //Friend
  app.post('/friend/create',friend.createFriend);
  app.post('/friend/contacts',friend.addFriend);
  app.post('/friend/dislike',friend.dislikeFriend);
  app.get('/friend/contacts',friend.friendList);
  app.delete('/friend/contacts',friend.delFriend);
}