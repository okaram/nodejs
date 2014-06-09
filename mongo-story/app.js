var express= require('express');
var app=express();

var Handlebars=require('handlebars');
app.get('/pub/*', function(req,res) { console.log('.'+req.path) ; res.sendfile('.'+req.path); }); 

var mongourl=require('mongourl.js');
console.log(mongourl);

function g2(req,res) {
    res.send('hello 2 hello 2');
}

app.get('/hello2',g2);

var page1="<html><head><title> Story </title></head><body><h1>{{title}}</h1>{{story}}</body></html>";

var tpt_page1=Handlebars.compile(page1);

// Retrieve
var MongoClient = require('mongodb').MongoClient;

function con(req,res){
    // Connect to the db

    MongoClient.connect(mongourl, function(err, db) {
    if(!err) {
        console.log("We are connected");
        var collection = db.collection('test');
        var obj=collection.findOne(function(err,obj){res.send(obj)});
        
    } else {
        console.log('error');
        console.log(err);
    }
});

}


function sendStory(values,story,res) {
    var story1=Handlebars.compile(story.story);
    
    res.send(tpt_page1({title: story.title, story: story1(values)}));
}   

function getStory(req,res) {
    // eventually, read variables, read story from mongo
    sendStory({name:'world'}, {title:"The Story", story:"Hello {{name}}"}, res);
}

app.get('/con',con);
app.get('/story',getStory);

app.get('/hello.txt' , function(req,res) {
    res.send('hello')
});


var server=app.listen(3000,function() {
    console.log('listening');
});


