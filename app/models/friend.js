//bulid model 
var mongoose=require('mongoose');
var friendSchema=require('../schemas/friendSchema');
//compile generate module
var Friend=mongoose.model('Friend',friendSchema);

module.exports=Friend