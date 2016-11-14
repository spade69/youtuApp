var formidable=require('formidable');

//judging if obj==={} ,which is an empty object
var isEmptyObject=function(obj){
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

exports.uploadFile=function(req,res){
    //console.log(hasBody(req));
    if(hasBody(req)){
        if(mime(req)==='multipart/form-data'){
            var form=new formidable.IncomingForm();
            form.parse(req,function(err,fields,files){
                req.body=fields;
                req.files=files;
                console.log("parsing..",req.body);
                console.log(req.files);
                return res.json({msg:'sucess'});
            })
        }
    }else{
        console.log('No file uploading..');
        return res.json({msg:'failed'});
    }
}