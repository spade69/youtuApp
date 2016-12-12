// import model file  and crypto module,it's used to generate hash value to encode password
var mongoose=require('mongoose');
//var User=mongoose.model('User');
var User=require('../models/user');//usermodel
var index=require('../utils/index');

//signup POST
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
        //此处的user 是一个Entity(document)
        user=new User({
            username:username,
            password:req.body.password,
            email:req.body.email,
            //set default value 
            age:0,
            gender:'',
            constellation:'',
            phoneNumber:0,
            signature:'',
            hometown:'',
            fansNumber:0,
            profession:'',
            post:'',
            interests:'',
            location:''
        });
        user.save(function(err,user){
            if(err){
                console.log(err);
                return res.json({msg:'Error, may be duplicate key',result:1});
            }
            return res.json({msg:'Success',result:0,id:user._id});
        });
    }
  })
}

//signin app.post('/signin'
exports.signin=function(req,res){
        //var _user=req.body.username;
        var token=req.session.csrf;
        var csrf=req.body.csrf;

        var username=req.body.username;
        var password=req.body.password;

        if(token!==csrf){
            return res.status(403).end('Forbidden Access');
        }

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

//返回用户的(全部)信息,Retrieving. Method : GET 
exports.query=function(req,res){
    var username=req.query.username;
    User.findOne({username:username},function(err,entity){
        if(err){
            console.log(err);
            return res.json({msg:'Error',result:1});
        }
        else if(!entity){
                console.log("no user named this");
                res.set({
                    'Content-Type':'application/json'
                });
                return res.status(302).json({msg:'no username match!',result:2});
     
        }
        else{
            var jsonStr=JSON.stringify(entity);
            console.log(jsonStr);
            return res.json({info:entity,result:0});
        }
    });
}

//Update details  相当于一个更新的API，要先find 对应的user
exports.details=function(req,res){
    //Post or Put? Both have req body!
    var username=req.body.username;//req.query处理查询字符串
    //var updateObj=Object.assign(req.body);
    var updateObj=index.deepCopy(req.body);
    var newObj={};
    //console.log(updateObj.hasOwnProperty);
    
    //copy properties
    for(var prop in updateObj){
        if(updateObj.hasOwnProperty(prop)){
            newObj[prop]=updateObj[prop];
        }
    }

    User.findOneAndUpdate({username:username},newObj,function(err,entity){
        if(err){
            console.log(err);
            return res.json({msg:'Error',result:1});
        }
         else if(!entity){
                console.log("no user named this");
                res.set({
                    'Content-Type':'application/json'
                });
                return res.status(302).json({msg:'no username match!',result:2});
        }else{
            console.log(newObj);
            return res.json({msg:'Update success',result:0});
        }

    });
}

//Delete a user
exports.delete=function(req,res){
    //Delete a user info
    var username=req.body.username;
    var id=req.body._id;//body 提供 
    User.findById({_id:id},function(err,entity){
        if(err){
            console.log(err);
            return res.json({msg:'Error',result:1});
        }else if(!entity){
            console.log("no document matched");
            return res.status(302).json({msg:'no document matched',result:2});
        }else{
            entity.remove(function(err,product){
                if(err){
                    return res.json({msg:'Error',result:1});
                }else{
                    console.log(product);//null
                    return res.json({msg:'remove success',result:0});
                }
            });
        }
    });
}
