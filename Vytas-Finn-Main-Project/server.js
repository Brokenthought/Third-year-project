var express=require('express');
var app=express();

app.use(express.static(__dirname+'/public'));

require('./router')(app);

app.set('views',__dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);


var server=app.listen(7000,function(){
    console.log("Express is running on port 7000" + __dirname);
});