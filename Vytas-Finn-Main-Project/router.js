/**
 * Created by Mind Taker! on 27/04/2015.
 */
module.exports=function(app)
{
    app.get('/',function(req,res){
        res.render('index.html')
    });
    app.get('/index.html',function(req,res){
        res.render('index.html')
    });
    app.get('/population.html',function(req,res){
        res.render('population.html');
    });
    app.get('/economy.html',function(req,res){
        res.render('economy.html');
    });
    app.get('/industry.html',function(req,res){
        res.render('industry.html');
    });
    app.get('/jelly.html',function(req,res){
        res.render('jelly.html');
    });

}