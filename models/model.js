//bulid model 
var mongoose=require('mongoose');
var userSchema=require('../schemas/schema');
//compile generate module
var user=mongoose.model('user',userSchema);

module.exports=user;