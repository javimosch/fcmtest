//This is a basic local server. Could help us to deploy and test the mobile app using heroku.
var express = require('express'),
app = express();
app.use(express.static('www'));
app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function () {
    console.log('Local express server listening on port ' + app.get('port'));
});