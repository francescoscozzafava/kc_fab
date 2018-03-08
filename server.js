var express = require('express');
var app = new express();

app.use(express.static(__dirname ));

app.listen(81, function () {
  console.log('Server running...');
});