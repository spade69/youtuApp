//bulid model 
var mongoose=require('mongoose');
var userSchema=require('../schemas/schema');
//compile generate module
var User=mongoose.model('User',userSchema);

module.exports=User;