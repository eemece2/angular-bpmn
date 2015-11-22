var fs = require('fs'),
    express = require('express');

var bpmn = require('../lib/bpmn.js');
//var inspect = require('eyes').inspector({ maxLength: false });
var XMLDir = __dirname + '/process/';

///////////////////////////////////////////////////////////////////////////////
// Server
var app = express();
app.use(express.static('.'));

app.get('/', function(req, res) {
    res.redirect('/example');
});

app.get('/bpmn', function(req, res) {
    //console.log('BPMN');
    fs.readdir(XMLDir, function(err, data) {
        if(err) {
            res.send('Error');
        }
        res.send(data);
    });
});

app.get('/bpmn/:def', function(req, res) {
    var defId = req.params.def;
    var xmlPath = XMLDir + defId;
    console.log(xmlPath);

    bpmn.getJson({ xmlPath: xmlPath }, function(err, json) {
        if(err) {
            res.send(err);
        }
        res.send(json);
    });
    //fs.readFile(pathDef, function(err, data) {
        //if(err) {
            //res.send(err);
        //}
        //bpmn.getJson({ xml: data }, function(err, json) {
            //if(err) {
                //res.send(err);
            //}
            //res.send(json);
        //});
    //});
});

///////////////////////////////////////////////////////////////////////////////
app.listen(8000, function (err) {
    console.log('Listen on 8000');
});
///////////////////////////////////////////////////////////////////////////////
