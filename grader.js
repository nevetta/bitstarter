#!/usr/bin/env node
var fs = require('fs');
var program = require('commander');
var cheerio = require('cheerio');
//var rest = require('restler');
var HTMLFILE_DEFAULT = "index.html";
var CHECKSFILE_DEFAULT = "checks.json";
//var URL_DEFAULT ="http://floating-oasis-2503.herokuapp.com";

var assertFileExists = function(infile) {
    var instr = infile.toString();
    if(!fs.existsSync(instr)) {
        console.log("%s does not exist. Exiting.", instr);
        process.exit(1);
    }
    return instr;
};

var cheerioHtmlFile = function(htmlfile) {
    return cheerio.load(fs.readFileSync(htmlfile));
};

var loadChecks = function(checksfile) {
    return JSON.parse(fs.readFileSync(checksfile));
};

var checkHtmlFile = function(htmlfile, checksfile) {
    $ = cheerioHtmlFile(htmlfile);
    var checks = loadChecks(checksfile).sort();
    var out = {};
    for(var ii in checks) {
        var present = $(checks[ii]).length > 0;
        out[checks[ii]] = present;
    }
    return out;
};

/*var checkUrl = function(url, checksfile) {
    rest.get(url).on('complete', function(data) {
                $ = cheerio.load(data);
            var checks = loadChecks(checksfile).sort();
            var out = {};
            for(var ii in checks) {
                var present = $(checks[ii]).length > 0;
                out[checks[ii]] = present;
            }
            console.log(out);
        });
}*/

var clone = function(fn) {
   
       return fn.bind({});
};

if(require.main == module) {
    program
        .option('-f, --file <html_file>', 'Path to index.html', clone(assertFileExists), HTMLFILE_DEFAULT)
      /*  .option('-u, --url <url>', 'URL to index.html', URL_DEFAULT)*/
        .option('-c, --checks <check_file>', 'Path to checks.json', clone(assertFileExists), CHECKSFILE_DEFAULT)
        .parse(process.argv);

    var checkJson = checkHtmlFile(program.file, program.checks);
    var outJson = JSON.stringify(checkJson, null, 4);
    console.log(outJson);

    /*var checkJson2 = checkUrl(program.url, program.checks);
    var outJson2 = JSON.stringify(checkJson2, null, 4);
    console.log(outJson2);*/

} 
else {
    exports.checkHtmlFile = checkHtmlFile;
}
