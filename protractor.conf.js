'use strict';
var config = require('./lib/config.js');
var sleep = require('system-sleep');
var jasmineReporters = require('jasmine-reporters');
var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');
var child = null;
var timeout = 10000;
var xmlPath;

exports.config = {
    beforeLaunch : function () {
        var spawn = require('child_process').spawn;
        child = spawn('node', ['start.js'], {
            detached: true,
            stdio: 'ignore'
        });
        child.unref();
        sleep(timeout);

        xmlPath = "reports_" + process.env.TIME_VAL;
    },
    seleniumAddress: 'http://localhost:4444/wd/hub', specs: ['test/automationTests.js'],
    baseUrl: config.getBaseUrl(),
    framework: 'jasmine2',

    onPrepare: function () {

        
        // set implicit wait times in ms...
        browser.manage().timeouts().implicitlyWait(5000);
        // set browser size...
        browser.manage().window().maximize();//.setSize(1024, 800);

        // better jasmine 2 reports...
        
        jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
            
            savePath: "testresults/" + xmlPath
        }));

        jasmine.getEnv().addReporter(new Jasmine2HtmlReporter({
            savePath: "testresults/" + xmlPath + "/html",
            screenshotsFolder: 'images'
        }));

        global.user = config.getUserInfo();
    },

   // directConnect : true,

    capabilities: { 
        'browserName': config.getBrowserName(),
        'phantomjs.binary.path': require('phantomjs-prebuilt').path,
        'marionette': true 
    },

    jasmineNodeOpts: {  
        showColors: true,
        displayStacktrace: true,
        displaySpecDuration: true,
        // overrides jasmine's print method to report dot syntax for custom reports
        print: function () {},
        defaultTimeoutInterval: 50000
    },

    afterLaunch : function () {
        var spawn = require('child_process').spawn;
        child = spawn('node', ['stop.js'], {
            detached: true,
            stdio: 'ignore'
        });
        child.unref();
        sleep(timeout);   
    }

};
