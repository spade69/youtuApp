
//we render our pages in route  
/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});*/

module.exports = function(app){
	app.get('/',function(req,res){
		 res.render('index', { title: 'Youtu' });
	});
};
