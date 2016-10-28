var mongodb = require('./db'); //db is a module write by myself

//create a object User also a module
function User(user) {
	this.name = user.name;
	this.password = user.password;
	this.email = user.email;
}


//adding ,create user info
User.prototype.save = function(callback) {
	//要存入数据库的用户文档
	var userx = {
		username: this.name,
		password: this.password,
		email: this.email
	};
	//open database
	mongodb.open(function(err, db) {
		if (err) {
			return callback(err); //return error info
		}
		//reading user collection , i've already create this collection
		db.collection('user', function(err, collection) {
			if (err) {
				mongodb.close();
				return callback(err);
			}
			//将用户数据insert 到 user collection
			collection.insert(userx, {
					safe: true
				},function(err, result) {
					mongodb.close();
					if (err) {
						return callback(err);
					}
					callback(result); ////并返回存储后的用户文档
					
				});
		});

	});
};

//read user info
// searching key : name,name is args you pass
User.get = function(name, callback) {
	//打开数据库
	mongodb.open(function(err,db){
		if(err){
			return callback(err);
		}
		//read user collection
		db.collection('user',function(err,collection){
			if(err){
				mongodb.close();
				return callback(err);//error info
			}
			//search user key 
			collection.findOne({username:name
			},function(err,user){
				mongodb.close();
				if(err){
					return callback(err);
				}
				callback(null,user);//sucess return user info
			})
		})
	})
}

module.exports = User;