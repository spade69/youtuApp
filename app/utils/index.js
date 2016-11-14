var formidable=require('formidable');
var crypto=require('crypto');
//limitation of a upload file
var bytes=102400; //100MB

//random function
var generateRandom=function(len){
    return crypto.randomBytes(Math.ceil(len*3/4))
        .toString('base64')
        .slice(0,len); //combine to one array
};

//judging if obj==={} ,which is an empty object
var isEmptyObject=function(obj){
    //caller make sure  obj is  an object
    if(obj==null) return true;
    return Object.keys(obj).length===0;
};

var hasBody=function(req){
    //return 'transfer-encoding' in req.headers || 'content-length' in req.headers;
    return req.headers['content-length']>0;
}

var mime=function(req){
    var str=req.headers['content-type']||"";
    return str.split(';')[0];
};
exports.mime=mime;
exports.isEmptyObject=isEmptyObject;
exports.generateRandom=generateRandom;

exports.uploadFile=function(req,res){
    //console.log(hasBody(req));
    //judging if len over the limit
    var len=req.headers['content-length']?parseInt(req.headers['content-length'],10):null;
    if(len&&len>bytes){
        return res.status(413).end(); //res.writeHead
    }
//shoule save in somewhere
    if(hasBody(req)){
        if(mime(req)==='multipart/form-data'){
            var form=new formidable.IncomingForm();
            form.parse(req,function(err,fields,files){
                req.body=fields;
                req.files=files;
                console.log("parsing..",req.body);
                console.log(req.files);
                return res.json({msg:'sucess',result:0});
            })
        }
    }else{
        console.log('No file uploading..');
        return res.json({msg:'failed',result:1});
    }
}