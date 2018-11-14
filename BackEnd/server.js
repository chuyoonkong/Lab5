var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var mongoDB = 'mongodb://admin:admin123@ds145923.mlab.com:45923/exlab5';
mongoose.connect(mongoDB);

var Schema = mongoose.Schema;
var postSchema = new Schema({
    title: String,
    content: String
})
var PostModel = mongoose.model('post', postSchema);


//Here we are configuring express to use body-parser as middle-ware. 
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
    next();
    });
    
app.post('/name', function(req, res){
    res.send("Hello you sent " +
    req.body.firstname + " " +
    req.body.lastname);
})

app.get('/', function (req, res) {
   res.send('Hello from Express');
})

app.post('/api/posts', function(req, res){
    console.log("post successful");
    console.log(req.body.title);
    console.log(req.body.content);

    PostModel.create({
        title: req.body.title,
        content: req.body.content
    });

res.send("First added successfully!");
})

app.get('/api/posts', function(req, res){

    PostModel.find(function(err, data){
        if(err)
            res.send(err)
        res.json(data);
    });
 
})

app.get('/getposts/:title', function (req, res){
    console.log("Get " + req.params.title + " Post");

    PostModel.find({'title': req.params.title},
        function(err, data){
            if(err)
                return handleError(err);

            res.json(data);
        });
});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT, OPTIONS")
    res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
    next();
    });
    app.delete('/api/posts/:id', function(req,res){
    PostModel.deleteOne({ _id: req.params.id },
    function (err, data) {
            if(err)
                res.send(err);
            res.send(data);
        });
    })

    app.get('/api/posts/:id', function(req,res){
        PostModel.find({ _id: req.params.id},
            function (err, data) {
                if (err)
                    return handleError(err);
                res.json(data);
            });
        });

    app.put('/api/posts/:id', function(req,res){
        PostModel.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
            if (err) return next(err);
            res.json(post);
        });
    });
        
    var server = app.listen(8081, function () {
        var host = server.address().address
        var port = server.address().port
   
        console.log("Example app listening at http://%s:%s", host, port)
})