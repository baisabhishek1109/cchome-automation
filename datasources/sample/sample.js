'use strict';
var loginPage = require('../../pages/loginPage');
var chai = require('chai');
var expect = chai.expect;


var testcases = { "suiteName": "Sample Tests",
    "category" : ['demo'], 
    "browser":['chrome','safari'],
    "beforeEach": function () {
        loginPage.to();
        expect(loginPage.at()).to.be.ok;
    },
    "tests" : [ 
        {
            "name" : "Should redirect to login page safely",
            "func" : function (done) { 
                //loginPage.clickOnEelement(loginPage.signIn);
                loginPage.waitForVisible(loginPage.usernameInput).then(function (result) {
                    expect(result).to.be.true;
                    done();
                });
            },
            "browser":['chrome','firefox','safari','phantomjs'],
            "category" : ['smoke']
        }]
   
};

module.exports = testcases;
