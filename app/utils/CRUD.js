//depends on the mongoose api, But mongoDB api for nodejs 

function Query(Model,prop,req,res){
    var queryParam=req.query[prop]?req.query[prop]:req.query._id;
    var param=req.query[prop]?prop:'_id';
    console.log(queryParam,param);
    var callback=function(err,entity){
        if(err){
            console.log(err);
            return res.json({msg:'Error',result:1});
        }
        else if(!entity){
                console.log("no entity matched this");
                res.set({
                    'Content-Type':'application/json'
                });
                return res.json({msg:'no entity match!',result:2});
        }
        else{
            var jsonStr=JSON.stringify(entity);
            console.log(jsonStr);
            return res.json({info:entity,result:0});
        }
    };
    if(req.query[prop]){
        //必须构造一个对象的形式来查询。 
        //不然直接写{param:queryParam}, 前面的param还是被认为是
        //一个属性名
        var condition={};
        condition[param]=queryParam;
        Model.findOne(condition,callback); //不需要写成匿名函数形式
    }else{
        Model.findById(queryParam,callback);
    }
}

//Delete a document  FindById and remove
function deleteDoc(Model,req,res){
    var id=req.body._id;
    Model.findById(id,function(err,entity){
        if(err){
            console.log(err);
            return res.json({msg:'Error',result:1});
        }else if(!entity){
            console.log("no document matched");
            return res.json({msg:'no document matched',result:2});
        }else{
            entity.remove(function(err,product){
                if(err){
                    return res.json({msg:'Error',result:1});
                }else{
                    console.log(product);
                    return res.json({msg:'remove success',result:0}); 
                }
            })
        }
    });
}

exports.Query=Query;
exports.deleteDoc=deleteDoc;