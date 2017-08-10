var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
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
	var htmlTemplate=`<html>
		<head>
			<title>${title}</title>
			<link rel="stylesheet" type="text/css" href="/ui/style.css">
			<meta name="viewport" content="width=device-width, initial-scale=1">
		</head>
		<body>
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
		</div> 
		</body>
		</html>`;

		return htmlTemplate;
}

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
