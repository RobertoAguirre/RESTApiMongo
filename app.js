
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post');

const app = express();


mongoose.connect('mongodb://localhost:27017/mongoapi')
    .then(() => {
        console.log("Connected to the database");
    })
    .catch(err => {
        console.log("Connection failed: " + err);
    });


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
//manipulate the response setting no path because we want to affect all endpoints
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type,Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH,PUT, DELETE, OPTIONS");//OPTIONS IS SENT BEFORE A POST REQUEST
    next();
})

app.use((req,res,next) => {
    console.log("first middleware");
    next();//always send next if you are not sending a response
});

app.get('/api/posts',(req, res, next) => {
    const posts=[
        {id:1, title: 'cASDFASDFosa1',author: 'hurrdurr' },
        {id:2, title: 'cosados',author: 'hurrdurr' },
        {id:3, title: 'cosatres',author: 'hurrdurr' }

    ]
    res.status(200).json({
        message: 'posts fetched successfully',
        posts: posts
    });
});


app.post('/api/posts',(req, res, next) => {
    const post=new Post({
        title:req.body.title,
        author:req.body.author
    });
    post.save();
    console.log(post);
    res.status(201).json({
        message:"Post created successfully"
    })
})

module.exports = app;