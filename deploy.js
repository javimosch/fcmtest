var FtpDeploy = require('ftp-deploy');
var ftpDeploy = new FtpDeploy();
var fs = require('fs');
require('dotenv').config();

var REQUIRED_ENVS = ['FTP_USERNAME', 'FTP_PASSWORD', 'FTP_HOSTNAME', 'FTP_PORT', 'FTP_ROOT','FTP_UPLOAD_FOLDER'];

function validateEnviromentalParameters() {
    var vars = process.env;
    var message = '';
    REQUIRED_ENVS.forEach(varName => {
        //console.log(varName,vars[varName])
        if (!vars[varName]) message = varName + ' is a required enviromental variable.';
    });
    return message;
}



if (validateEnviromentalParameters()) {
    console.log(validateEnviromentalParameters());
    process.exit(1);
}

var FTP_UPLOAD_FOLDER = process.env.FTP_UPLOAD_FOLDER || 'public';

var remoteRoot = process.env.FTP_ROOT || 'public_html';

var config = {
    username: process.env.FTP_USERNAME,
    password: process.env.FTP_PASSWORD,
    host: process.env.FTP_HOSTNAME,
    port: process.env.FTP_PORT || 21,
    localRoot: process.cwd() + "/"+FTP_UPLOAD_FOLDER,
    remoteRoot: "/" + ((remoteRoot) ? remoteRoot + '/' : ''),
    exclude: ['.git', '.idea', 'tmp/*', 'vendor']
}


//console.log('deploy:config', config);
console.log('deploy:start');
ftpDeploy.on('upload-error', function(data) {
    console.log('deploy:error', data.filename, data.err);
});
ftpDeploy.on('uploading', function(data) {
    console.log('deploy:transfer', data.filename, data.percentComplete + ' %', data.transferredFileCount + '/' + data.totalFileCount);
});
ftpDeploy.on('uploaded', function(data) {
    //console.log(data); // same data as uploading event
    console.log('deploy:uploaded', data.filename, 'uploaded');
});
ftpDeploy.deploy(config, function(err) {
    if (err) console.log(err)
    else {
        console.log('deploy:success');
    }
});
