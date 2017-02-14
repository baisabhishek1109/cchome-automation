"use strict";
var Iterator = require('../lib/testcaseIterator');
var config = require('../lib/config');
var iterator = Iterator.iterator;

var glob = require("glob");

var automationTests = [];

var path = config.getTestDir();

var files = glob.sync(path, {});

var testcase=null,testObj=null;

files.forEach(function (file) {
    automationTests.push(require('../' + file));
}); 

automationTests.forEach(function (testFile) {

    testObj = iterator(testFile);

    describe(testFile.suiteName, function () {

        browser.ignoreSynchronization = true;
      
        beforeEach(testFile.beforeEach);

        testcase = testObj.next();

        while (testcase.exist) {

            if (testcase.skip)
                it.skip(testcase.value.name, function () {});
            else {

                it(testcase.value.name, testcase.value.func);
            }

            testcase = testObj.next();
        }


    });

});
