// import model file  and crypto module,it's used to generate hash value to encode password
var mongoose=require('mongoose');
var User=mongoose.model('User');

//signup
exports.signup=function(req,res){
  var username=req.body.username;
  User.findOne({username:username},function(err,user){
    if(err){
        console.log(err);
        return res.json({msg:'Error',result:1});
    }
    //checkNotLogin
    if(req.session.user||user){
        return res.json({msg:'Already regisiter',result:2});
    }
    else{
        user=new User({
            username:username,
            password:req.body.password,
            email:req.body.email
        });
        user.save(function(err,user){
            if(err){
                console.log(err);
                return res.json({msg:'Error',result:1});
            }
            return res.json({msg:'Success',result:0});
        })
    }
  })
}

//signin app.post('/signin'
exports.signin=function(req,res){
        //var _user=req.body.username;
        var username=req.body.username;
        var password=req.body.password;
        if(req.session.user)
            return res.json({msg:'error!already login!',result:4});
        User.findOne({username:username},function(err,user){
            if(err){
                console.log(err);
                res.set({
                    'Content-Type':'application/json'
                });
                return res.status(303).json({msg:'error',result:3});
            }
            if(!user){
                console.log("no user named this");
                res.set({
                    'Content-Type':'application/json'
                });
                return res.status(302).json({msg:'no username match!',result:1});
     
            }
            user.comparePassword(password,function(err,isMatch){
                if(err){
                    console.log(err)
                    return res.json({msg:'error',result:3});
                }
                if(isMatch){
                    console.log('Password is matched!');
                    req.session.user=user;
                    return res.json({msg:'username match!',result:0});
                    //return res.redirect('/');
                }else{
                    console.log('Password is not match');
                    return res.json({msg:'password is not matched',result:2});
                    //return res.redirect('/user/login');
                }
            })
        })
    
}
//can delete req.session.user in memory. (内存)  But database still store it
exports.logout=function(req,res){
    if(req.session.user==null)
        return res.json({msg:'already logout!',result:1});
    else{
        delete req.session.user;
        //req.session.user=null;
        return res.json({msg:'log out success',result:0});
    }
}