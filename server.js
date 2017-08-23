var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require("pg").Pool;

var config = {
	user: "sankeerthsharma1",
	host: "http://db.imad.hasura-app.io",
	database: "sankeerthsharma1",
	port: "5432",
	password: process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));

app.get('/', function (req, res) {
	comments = [];
  	res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/temp.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'temp.js'));
});

app.get('/test-DB', function(req, res) {
	pool.query('select * from author', function(err, res) {
		if(err) {
			res.status(500).send(err.toString());
		} else {
			res.send(JSON.stringify(result));
		}
	});
});

var articles = {
	'article-one': {
		title:'Article One Page',
		heading:'Article One',
		date: '05, Aug 2017',
		content: `<p>First article content goes here. First article content goes here. First article content goes here. First article content goes here. First article content goes here. First article content goes here. </p>
	<p>First article content goes here. First article content goes here. First article content goes here. First article content goes here. First article content goes here. First article content goes here. </p>
	<p>First article content goes here. First article content goes here. First article content goes here. First article content goes here. First article content goes here. First article content goes here. </p>`
	},
	'article-two'	: {
		title:'Article TWO Page',
		heading:'Article TWO',
		date: '15, Aug 2017',
		content: '<p>Second article content goes here. </p>'
	},
	'article-three': {
		title:'Article Three Page',
		heading:'Article Three',
		date: '25, Aug 2017',
		content: '<p>Third article content goes here. </p>'
	}
};

function createTemplate(data) {	
	var title = data.title;
	var date = data.date;
	var heading = data.heading;
	var content = data.content;
	var htmlTemplate=`<!doctype html>
		<html>
		<head>
			<title>${title}</title>			
			<meta name="viewport" content="width=device-width, initial-scale=1">
			<link rel="stylesheet" type="text/css" href="/ui/style.css"/>
		</head>
		<body>
		  <script type="text/javascript" src="../ui/temp.js"></script>
		<div>
			<a href="/">home</a>
		</div>
		<hr>
		<h1>${heading}</h1>
		<div>
			${date}
		</div>
		<div class='container'>
			${content}

			Comment <!--<input type="text" id="comment" placeholder="enter comment"></input>-->

			<textarea id=comment rows="4" cols="50"></textarea>
			<input type="submit" id="btnComment" onclick="postComment();"></input>
		</div> 
			<div class="center"><ul id="commentList">  			
			</ul></div>
		</body>
		</html>`;

		return htmlTemplate;
}

var counter=0;
app.get('/counter', function(req, res) {
	counter++;
	res.send(counter.toString());
});

var names = [];
//app.get('/submitName/:name', function (req, res) {
app.get('/submitName', function (req, res) {
	//var name=req.params.name;
	var name=req.query.name;
	names.push(name);
	res.send(JSON.stringify(names));
});

var comments = [];
//app.get('/submitName/:name', function (req, res) {
app.get('/submitComment', function (req, res) {
	//var name=req.params.name;
	var comment=req.query.comment;
	comments.push(comment);
	res.send(JSON.stringify(comments));
});

app.get('/:articleName', function (req, res) {
  //res.send('article one requested will be served shortly');
  //res.sendFile(path.join(__dirname, 'ui', 'article-one.html'));
  var articleName=req.params.articleName;
  res.send(createTemplate(articles[articleName]));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
