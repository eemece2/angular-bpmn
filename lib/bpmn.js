var fs     = require('fs');
var xml2js = require('xml2js');

///////////////////////////////////////////////////////////////////////////////
module.exports = {
    getJson: getJson
};
///////////////////////////////////////////////////////////////////////////////
var parser = new xml2js.Parser({ mergeAttrs: false });

// options.xml: xml data
// options.xmlPath: xml path
function getJson(options, callback) {
    if(options.xmlPath) {
        fs.readFile(options.xmlPath, function(err, xml) {
            if(err) {
                res.send(err);
            }
            parseXml(xml, callback);
        });
    } else if(options.xml){
        parseXml(options.xml, callback);
    } else {
        callback('options.xml or options.xmlPath needed');
    }
}

///////////////////////////////////////////////////////////////////////////////
// private
function parseXml(xml, callback) {
    var diElements = {};
    parser.parseString(
        xml,
        function (err, bpmnJson) {
            if(err) {
                callback(err);
            }
            removeNamespaces(bpmnJson);
            diElements = extractDiElements(bpmnJson);
            injectDi(bpmnJson, diElements);
            callback(null, bpmnJson);
    });
}

function removeNamespaces(json) {
    function scan(obj) {
        var k;
        if (obj instanceof Object) {
            for (k in obj) {
                if (obj.hasOwnProperty(k)) {
                    //console.log(obj[k]);
                    //console.log(k);
                    var res = /.+:(.+)/.exec(k);
                    if(res) {
                        var type = res[1];
                        //obj[type] = deepcopy(obj[k]);
                        obj[type] = obj[k];
                        obj[k] = undefined;
                        //recursive call to scan property
                        scan(obj[type]);
                    } else {
                        //recursive call to scan property
                        scan(obj[k]);
                    }
                }
            }
        } else {
            //not an Object so obj[k] here is a value
        }
    }
    scan(json);
}

// Diagram (shapes and edges)
function extractDiElements(bpmnJson) {
    var diElements = {};
    var plane = bpmnJson.definitions.BPMNDiagram[0].BPMNPlane[0];

    var bpmndiTypes = ['BPMNShape', 'BPMNEdge'];
    bpmndiTypes.forEach(function(type) {
        var bpmndiElements = plane[type];
        bpmndiElements .forEach(function(bpmndiElement) {
            var elementId = bpmndiElement.$.bpmnElement;
            diElements[elementId] = bpmndiElement;
        });
    });

    return diElements;
}

function injectDi(bpmnJson, diElements) {
    function scan(obj) {
        var k;
        if (obj instanceof Object) {
            var id = null;
            if(obj.$) {
                id = obj.$.id;
            }
            if(id && diElements[id]) {
                obj.di = diElements[id];
            }

            for (k in obj) {
                if (obj.hasOwnProperty(k)) {
                    scan(obj[k]);
                }
            }
        } else {
            //not an Object so obj[k] here is a value
        }
    }
    scan(bpmnJson);
}
