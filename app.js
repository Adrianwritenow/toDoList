const express =  require('express');
const mustacheExpress =require('mustache-express')
const expressValidator = require('express-validator');
const bodyParser = require('body-parser');

const toDo = [];
const app =  express();

app.use(express.static('public'));

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//configure express validator
app.use(expressValidator());

app.get('/', function(request, response) {
  response.render('form',{toDo:toDo});
});

app.post('/', function(request, response){
  var schema = {
    'toDoField':{
      notEmpty: true,
      isLength:{
        options: [{max: 80}],
        errorMessage: 'Try breaking that up into smaller tasks!'
      },
      errorMessage: 'Do more stuff'
    }
  };
  toDo.push(request.body)


  request.assert(schema);
  request.getValidationResult().then(function(result){
    if(result.isEmpty()){
      response.render('form', {toDo:toDo});
      console.log(request.body);

    }else{
      response.render('form',{errors:result.array()});

    }
  });
});

app.listen(3000, function(){
  console.log('Server Farted');
});
