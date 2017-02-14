
"use strict";

var config = require('./../config/config.json');
var request = require('request');
var queryString = require('querystring');



var NODE_ENV = process.env.NODE_ENV || 'stage';

var nodeEnvVars = config[NODE_ENV] || config['stage'];

var userEmail = process.env.USERNAME; //cc_tester@yahoo.in

var userPass = process.env.PASSWORD;   //test@123

var sessionTimeout = 10000;

var apiEndpoint = process.env.FRONTEND_ENDPOINT || nodeEnvVars.endpoint;

var data = null,storage=null,sessionObj=null;

module.exports = {

    getBaseUrl: function () {
        return apiEndpoint;
    },
    getNodeEnv: function () {
        return NODE_ENV;
    },
    getUserInfo:function(){
        if(userEmail&&userPass)
        return {username : userEmail, pass : userPass};
        throw new Error("Please set USERNAME and PASSWORD");
    },
     getRUNCategories: function () {
        return process.env.CATEGORY 
    },
    getExcludeCategory: function () {
        return process.env.EXCLUDE_CATEGORY 
    },
    getTestDir:function(){
        return 'datasources/**/*.js';
    },
    runConsoleTest: function () {
        return process.env.INCLUDE_CONSOLE_TESTS;
    },
    getBrowserName: function() {
        return process.env.BROWSER;
    }

};
