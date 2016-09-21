//This is a basic local server. Could help us to deploy and test the mobile app using heroku.
var express = require('express');
var fs = require('fs');
var path = require('path');
var app = express();

//writing config
var config = {
    API_ENDPOINT : process.env.API_ENDPOINT || 'http://shopmycourses.herokuapp.com/',
    GOOGLE_API_KEY:process.env.GOOGLE_API_KEY || '979481548722-mj63ev1utfe9v21l5pdiv4j0t1v7jhl2.apps.googleusercontent.com'
};
fs.writeFileSync(path.join(process.cwd(),'www','config.json'), JSON.stringify(config), 'utf8');

app.use(express.static('www'));
app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function () {
    console.log('Local express server listening on port ' + app.get('port'));
});