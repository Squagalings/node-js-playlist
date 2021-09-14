var bodyParser = require('body-parser')
var mongoose = require('mongoose')

// connect to the database
// mongoose.connect('mongodb+srv://test:test@todo.pztll.mongodb.net/todo?retryWrites=true&w=majority')

// mongoose.connect('mongodb+srv://test:test@todo.3wxjn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')

// app crashed when insertOne was initiated. This is because there is no connection to the dB server. IP was not in the whitelist. Hence, we set connect from anywhere in the network access tab, as a temporary solution.

mongoose.connect(
	'mongodb+srv://test:test@cluster0.iygkj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
);

var todoSchema = new mongoose.Schema({
  item: String
})
var Todo = mongoose.model('TodoExtra', todoSchema)
// var itemOne = Todo({item: 'eat wonton mee'}).save(function(error){
//   if(error) throw error
//   console.log('item saved!!!')
// })


// mongoose.disconnect()

var data = []

var urlencodedParser = bodyParser.urlencoded({extended: false})

module.exports = function(app) {

  app.get('/', function(req, res) {
    res.send('YES')
  })

  app.get('/todo', function(req, res) {
    res.render('todo', {todos: data});
  });

  // app.post('/todo', urlencodedParser, function(req, res) {
  //   data.push(req.body)
  //   res.json(data)
  // });

	app.post('/todo', urlencodedParser, function (req, res) {
		if (!req.body) {
			console.log('!req.body');
			console.log(req.body);
		} else {
			console.log(req.body);
			data.push(req.body);
		res.json(data);
		
		const itemTwo = Todo({
		  item: req.body.item,
		}).save(function (err) {
		  if (err) throw err;
		  console.log('item saved', req.body.item);
		});
		}
	});

  app.delete('/todo/:item', function(req, res) {
    data = data.filter(function(todo) {
      return todo.item.replace(/ /g, '-') !== req.params.item
    })
    res.json(data)
  });
  
};