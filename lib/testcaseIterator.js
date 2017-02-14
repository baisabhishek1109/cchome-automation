'use strict';
var config = require('./config.js');
var currentBrowser = config.getBrowserName();
var Iterator,fileData,testcases,browser,category,nextIndex;
function iterator(testcasesFile) {
    fileData = testcasesFile;
    category = fileData['category'];
    testcases = fileData['tests']; 
    browser = fileData['browser'];
    nextIndex = 0;
    return {
        next : function () {
            var test, cat;
            if (nextIndex < testcases.length) {
                test = testcases[nextIndex];
                cat = category;
                if ('category' in test)
                    cat = cat.concat(test['category']);
                if (isTestcaseAllowed(cat,test.browser)) {
                    nextIndex++;
                    return {value: test, exist : true, 
                        skip: skipTestCase(cat) };
                } else {
                    nextIndex++;
                    return this.next();
                }
            } else {
                return {exist : false};
            }
        }
    };
}

Iterator = {"iterator" : iterator};

function skipTestCase(cat) {
    if (cat.indexOf("skip") !== -1) {
        return true;
    }
    return false;
}

function isTestcaseAllowed(category,browsers) {
    var status = true;
    var categories, excludeCategory;
    if (config.getRUNCategories() === undefined)
        status = status;
    else {
        categories = config.getRUNCategories().split(",");
        status = containsAny(category, categories);
    }
    if (config.getExcludeCategory() === undefined)
        status = status;
    else { 
        excludeCategory = config.getExcludeCategory().split(",");
        status = status && !containsAny(category, excludeCategory);
    }

    if(browsers !== undefined) { 
        if(browsers.indexOf(currentBrowser) === -1)
            status = false;
    } else 
    status = true;

    

    return status;
}

function containsAny(source, target) {
    var result = source.filter(function (item) { 
        return target.indexOf(item) > -1;
    });   
    return (result.length > 0);  
} 

module.exports = Iterator;
