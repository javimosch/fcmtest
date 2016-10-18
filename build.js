var fs = require('fs');
var path = require('path');
require('dotenv').config();
var config = {
    API_ENDPOINT : process.env.API_ENDPOINT || 'http://shopmycourses.herokuapp.com/',
    GOOGLE_API_KEY:process.env.GOOGLE_API_KEY || '979481548722-mj63ev1utfe9v21l5pdiv4j0t1v7jhl2.apps.googleusercontent.com'
};
fs.writeFileSync(path.join(process.cwd(),'www','config.json'), JSON.stringify(config), 'utf8');

console.log('Config.json generated.');
process.exit(0);