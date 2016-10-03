var express = require('express');
var moment = require('moment');
var app = express();

app.use(express.static('public'));
app.get('/:userdate',function(req,res){
        var date = req.params.userdate;
        var unix = null;
        var natural = null;
        function toUnix(date) {
            return moment(date, "MMMM D, YYYY").format("X");
        }
        
        function toNatural(unix) {
            return moment.unix(unix).format("MMMM D, YYYY");
        }
    
        if (+date >= 0) {
            unix = +date;
            natural = toNatural(unix);
        } 
    
        if (isNaN(+date) && moment(date, "MMMM D, YYYY").isValid()) {
            unix = +toUnix(date);
            natural = toNatural(unix);
        }
        
        var dateObj = { "unix": unix, "natural": natural };
        res.end(JSON.stringify(dateObj));
        
    
});
app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});