exports.checkLogin=function(req,res,next){
	if(!req.session.user){
		return res.json({msg:'error not login now!',result:1});
	}
	next();
}

exports.checkNotLogin=function(req,res,next){
	if(req.session.user){
		return res.json({msg:'error!already login!',result:1});
	}	
	next();
}