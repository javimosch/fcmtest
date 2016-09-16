//This is a basic local server. Could help us to deploy and test the mobile app using heroku.
var express = require('express');
var fs = require('fs');
var path = require('path');
var app = express();

//writing config
var config = {
    API_ENDPOINT : process.env.API_ENDPOINT || 'http://shopmycourses.herokuapp.com/'
};
fs.writeFileSync(path.join(process.cwd(),'www','config.json'), JSON.stringify(config), 'utf8');

app.use(express.static('www'));
app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function () {
    console.log('Local express server listening on port ' + app.get('port'));
});