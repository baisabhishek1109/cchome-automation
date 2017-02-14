
var BasePage = function() {

    this.timeout = 10000;
   
    this.at = function() {
        return browser.wait(this.pageLoaded(), this.timeout);
    };

    this.to = function() {
        browser.get(this.url, this.timeout);
        return this.at();
    };

    var EC = protractor.ExpectedConditions;

    this.clickOnEelement = function(locator){
         browser.wait(this.isVisible(locator),this.timeout);
         locator.click();
    }

    this.waitForVisible  = function(locator){
        return  browser.wait(this.isVisible(locator),this.timeout);
    }

    this.isVisible = function(locator) {
        return EC.visibilityOf(locator);
    };

    this.isNotVisible = function(locator) {
        return EC.invisibilityOf(locator);
    };

    this.inDom = function(locator) {
        return EC.presenceOf(locator);
    };

    this.notInDom = function(locator) {
        return EC.stalenessOf(locator);
    };

    this.isClickable = function(locator) {
        return browser.wait(EC.elementToBeClickable(locator), this.timeout);
    };

    this.hasText = function(locator, text) {
        return EC.textToBePresentInElement(locator, text);
    };

    this.and = function(arrayOfFunctions) {
        return EC.and(arrayOfFunctions);
    };

    this.titleIs = function(title) {
        return EC.titleIs(title);
    };

    this.hasClass = function(locator, klass) {
        return locator.getAttribute('class').then(function(classes) {
            return classes.split(' ').indexOf(klass) !== -1;
        });
    };

    this.hitEnter = function() {
        return browser.actions().sendKeys(protractor.Key.ENTER).perform();
    };

    this.switchToWindow = function(windowHandleIndex, targetPage) {
        var that = this;
        // wait for new page to open...
        var handle = browser.wait(function() {
            return browser.getAllWindowHandles().then(function(handles) {
                // make sure window we're switching to exists...
                if(handles.length > windowHandleIndex) {
                    return handles[windowHandleIndex];
                } else {
                    throw new Error('window index ' + windowHandleIndex + ' does not exist');
                }
            });
        }, this.timeout);
        console.log('switching to window ' + windowHandleIndex);
        browser.switchTo().window(handle);
        // test that we're at the new page...
        targetPage.at();
    };

    protractor.ElementFinder.prototype.getWidth = function () {
        return this.getSize().then(function(size) {
            return size.width;
        });
    };

};
module.exports = new BasePage();
