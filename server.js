var express = require('express'),
    mongoose = require('mongoose');
var env = process.env.Node_ENV || "dev";
var app = express();

app.use(express.static('public'));
app.set('views',__dirname+ '/src/views');

app.set('view engine','pug');

var dbName = '';
if(env === "dev") {
    mongoose.connect('mongoDb://localhost/MeanDb');
    dbName = 'MeanDb';
}
else {
    mongoose.connect('mongodb://khaddad:ePageo2018!@ds025459.mlab.com:25459/kamalel7addad_flightsdb');
    dbName = 'kamalel7addad_flightsdb';
} 
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error...'));
db.once('open', function callback(){
    console.log(dbName+ ' opened successfully.');
})

var booksShcema = mongoose.Schema({title: String,site: String, publishDate: Date, order: Number});
var BookModel = mongoose.model('Book', booksShcema);
var mongoMessage;
BookModel.findOne().exec(function(err, messageDoc) {
  mongoMessage = messageDoc.title;
});

app.get('/partials/:name', function (req ,res) {
    res.render('partials/' + req.params.name);
});

app.get('/', (req, res) => {
    res.render('index',{
        massasge : mongoMessage});
  });

var port = process.env.PORT || 5000;
app.listen(port, function(err) {
    console.log('running server on port ' + port);
});