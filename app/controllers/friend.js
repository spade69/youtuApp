//import model
var mongoose=require('mongoose');
//等价于  var Friend=new Friend; //?
var Friend=require('../models/friend');
var index=require('../utils/index');

// var friend=new Friend({}) 创建一个Entity实例of Friend模型
exports.createFriend=function(req,res){
    var username=req.body.username;
    Friend.findOne({username:username},function(err,friend){
        if(err){
            console.log(err);
            return res.json({msg:'Error',result:1});
        }       
        else if(friend){
            return res.json({msg:'Already created',result:2});
        }else{
            //
            friend=new Friend({
                username:username,
                like:[],
                dislike:[],
                favorite:false
            });
            friend.save(function(err,friend){
                if(err){
                    console.log(err);
                    return res.json({msg:'Error, may be duplicate key',result:1});
                }
                return res.json({msg:'Success',result:0,id:friend._id});
            })
        }
    });
}

/*


 */

//like this friend & and add  friendList: POST
exports.addFriend=function(req,res){
    var username=req.body.username;
    var friendId=req.body.friendId;
    //findById find findOne all return Queries
    Friend.findById(friendId)
            .populate('like')
            .exec(function(err,friend){ //execute the queries
                if(err){
                    console.log(err);
                    return res.json({msg:'Error',result:1});
                }else if(!friend){
                    console.log("Friend List hasn't been created");
                    return res.json({msg:'no friend list match!',result:2})
                }else{
                    console.log('The like list is %s',friend.like.username);
                }
            });
}

//dislike  ,remove delete
exports.delFriend=function(){

}

//get friend list query
exports.friendList=function(){

}




