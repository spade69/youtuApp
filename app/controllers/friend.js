//import model
var mongoose=require('mongoose');
//等价于  var Friend=new Friend; //?
var Friend=require('../models/friend');
var User=require('../models/user');
var index=require('../utils/index');
var CRUD=require('../utils/CRUD');



// var friend=new Friend({}) 创建一个Entity实例of Friend模型
exports.createFriend=function(req,res){
    var username=req.body.username;
    //contacts contains yourself 联系人中有自己
    var self,flag=false;
   
 
 //这里就出现了嵌套回调了
    Friend.findOne({username:username},function(err,friend){
        if(err){
            console.log(err);
            return res.json({msg:'Error',result:1});
        }       
        else if(friend){
            return res.json({msg:'Already created',result:2});
        }else{
            User.findOne({username:username},function(err,user){
                if(err){
                    console.log(err);
                    return res.json({msg:'Error',result:1});
                }else if(!user){
                    return res.json({msg:'No User named '+username,result:3});
                }else{
                    self=user;
                    friend=new Friend({
                        username:username,
                        like:[self],
                        dislike:[],
                        favorite:false
                    });
                     friend.save(function(err,friend){
                        if(err){
                            console.log(err);
                            return res.json({msg:'Error, may be duplicate key',result:1});
                        }else{
                            return res.json({msg:'Success',result:0,id:friend._id});
                        }
                    });
                }
            });
            
        }
    });
}


//like this friend & and add  friendList: POST
exports.addFriend=function(req,res){
    var username=req.body.username;
    var newId=req.body._id;
    var friendName;
    //findById find findOne all return Queries
    Friend.findOne({username:username})
            .populate('like')
            .exec(function(err,friend){ //execute the queries
                if(err){
                    console.log(err);
                    return res.json({msg:'Error',result:1});
                }else if(!friend){
                    console.log("Friend List hasn't been created");
                    return res.json({msg:'no friend list match!',result:2})
                }else{
                    console.log('The like list is %s',friend.like);
                    friend.like.push(newId);
                    return res.json({msg:'success',result:0});
                }
            });
}

// remove delete friend in Like or dislike?
// 直接删除这个文档，而不是单单删除一个好友
exports.delFriend=function(req,res){
    //delete a friend list
    CRUD.deleteDoc(Friend,req,res);
}

//get friend list query by username
exports.friendList=function(req,res){
    //Model,prop,req,res
    //var username='username';
    CRUD.Query(Friend,'username',req,res);
}

//Query by Id
exports.friendListById=function(req,res){
     //Model,prop,req,res
    CRUD.Query(Friend,'_id',req,res);
}

exports.dislikeFriend=function(){

}



