var basePage = require('./basePage.js');

var LoginPage = function() {
    this.url = '';
    this.pageLoaded = this.inDom($('#globalnav__menu-bar'));
    this.signIn =  element(by.xpath('//*[@id="globalnav__menu-bar"]/ul/li[4]/button/span[2]'));
    this.usernameInput = $('#adobeid_username');
    this.passwordInput = $('#adobeid_password');
    this.signInButton = $('#sign_in');
    this.userNameLink = element(by.xpath('//*[@id="globalnav__menu-bar"]/ul/li[3]/button/span'));
    this.signout = $('#globalnav__header > nav > div > div > div > div.globalnav__profile__user-info.globalnav__js__profile__user-info > nav > button')
    this.containerElement = $('#globalnav__header > nav > div > div > div > div.globalnav__profile__user-info.globalnav__js__profile__user-info');
  /* this.addnameBox = element(by.model('addName'));
    this.addButton = element(by.buttonText('+ add'));
    this.actualCount = $('em.ng-binding');
    this.deleteButton = $('i.icon-trash');
    this.deleteButtons = $$('i.icon-trash');
    this.friendName = function(text) { return element.all(by.cssContainingText('td.ng-binding', text)); };
    // results...
    this.rows = element.all(by.repeater('row in rows'));
    this.names = element.all(by.repeater('row in rows').column('{{row}}'));  */

    /**
     * search for a friend
     * 
     * @param  {string} string 
     */
    
    this.makeLogin = function(){
        this.usernameInput.clear();
        this.usernameInput.sendKeys(user.username);
        this.passwordInput.sendKeys(user.pass);
        this.signInButton.click();
        this.waitForVisible(this.userNameLink);
        this.userNameLink.click();
        this.waitForVisible(this.containerElement);
        var EC = protractor.ExpectedConditions;
        var self = this;
        this.isClickable(this.signout).then(function(val){
           self.signout.click();
        });
       
    }
    
/*
    this.deleteFriend = function(nameString) {
        return this.rows.filter(function(row) {
            // find the row with the name we want...
            return row.$$('td').get(1).getText().then(function(name) {
                return name === nameString;
            });
        }).then(function(filteredRows) {
            filteredRows[0].$('i.icon-trash').click();
        });
    };

    this.inResults = function(name) {
        return this.friendName(name).then(function(found) {
            return found.length > 0;
        });
    };

    this.deleteAllFriends = function() {
        //this.deleteButtons.click();
        var buttons = this.deleteButtons;
        buttons.count().then(function(count) {
            while(count > 0) {
                buttons.get(0).click();
                count--;
            }
        });
    }; */
};

LoginPage.prototype = basePage; // extend basePage...
module.exports = new LoginPage();

