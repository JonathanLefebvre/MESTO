describe('e2e Room Autority : ', function () {
    function logUser(pUsername, pPwd) {
        element(by.id('loginButton')).click();
        
        element(by.model('logInfo.username')).clear();
        element(by.model('logInfo.username')).sendKeys(pUsername);
        element(by.model('logInfo.pwd')).clear();
        element(by.model('logInfo.pwd')).sendKeys(pPwd);
        
        element(by.id('login')).click();
    }
    
    beforeAll(function() {
        browser.get('http://localhost/MESTO/MESTO_WEB_APP/#/home');
        
        logUser('tester', 'tester');
        
        // Create a new Role
        //   navigation menu
        element(by.id('mnAdmin')).click();
        browser.actions().mouseMove(element(by.id('mnUser'))).perform();
        browser.sleep(500);
        element(by.id('mnRoles')).click();
        
        element(by.id('btnNewUserRole')).click();
        
        // Create the corresponding Role
        element(by.model('userRole.name')).sendKeys('Full -roomMng');
        element(by.model('userRole.description')).sendKeys('this is a role test for Security equipement object');
        element.all(by.options('avaiPerm.codeName as avaiPerm.name for avaiPerm in lstAvailablePermissions')).get(0).click();
        element.all(by.options('avaiPerm.codeName as avaiPerm.name for avaiPerm in lstAvailablePermissions')).get(1).click();
        element.all(by.options('avaiPerm.codeName as avaiPerm.name for avaiPerm in lstAvailablePermissions')).get(2).click();
        element.all(by.options('avaiPerm.codeName as avaiPerm.name for avaiPerm in lstAvailablePermissions')).get(3).click();
        //element.all(by.options('avaiPerm.codeName as avaiPerm.name for avaiPerm in lstAvailablePermissions')).get(4).click();
        element.all(by.options('avaiPerm.codeName as avaiPerm.name for avaiPerm in lstAvailablePermissions')).get(5).click();
        element.all(by.options('avaiPerm.codeName as avaiPerm.name for avaiPerm in lstAvailablePermissions')).get(6).click();
        element.all(by.options('avaiPerm.codeName as avaiPerm.name for avaiPerm in lstAvailablePermissions')).get(7).click();
        element.all(by.options('avaiPerm.codeName as avaiPerm.name for avaiPerm in lstAvailablePermissions')).get(8).click();
        element.all(by.options('avaiPerm.codeName as avaiPerm.name for avaiPerm in lstAvailablePermissions')).get(9).click();
        element.all(by.options('avaiPerm.codeName as avaiPerm.name for avaiPerm in lstAvailablePermissions')).get(10).click();
        //element.all(by.options('avaiPerm.codeName as avaiPerm.name for avaiPerm in lstAvailablePermissions')).get(11).click();
        element.all(by.options('avaiPerm.codeName as avaiPerm.name for avaiPerm in lstAvailablePermissions')).get(12).click();
        element.all(by.options('avaiPerm.codeName as avaiPerm.name for avaiPerm in lstAvailablePermissions')).get(13).click();
        element.all(by.options('avaiPerm.codeName as avaiPerm.name for avaiPerm in lstAvailablePermissions')).get(14).click();
        element.all(by.options('avaiPerm.codeName as avaiPerm.name for avaiPerm in lstAvailablePermissions')).get(15).click();
        //element.all(by.options('avaiPerm.codeName as avaiPerm.name for avaiPerm in lstAvailablePermissions')).get(16).click();
        element.all(by.options('avaiPerm.codeName as avaiPerm.name for avaiPerm in lstAvailablePermissions')).get(17).click();
        //element.all(by.options('avaiPerm.codeName as avaiPerm.name for avaiPerm in lstAvailablePermissions')).get(18).click();
        element.all(by.options('avaiPerm.codeName as avaiPerm.name for avaiPerm in lstAvailablePermissions')).get(19).click();
        element.all(by.options('avaiPerm.codeName as avaiPerm.name for avaiPerm in lstAvailablePermissions')).get(20).click();
        element(by.id('btnAffectPerm')).click();
        
        element(by.id('btnSave')).click();
        
        // navigate to user 
        browser.actions().mouseMove(element(by.id('mnUser'))).perform();
        browser.sleep(500);
        element(by.id('mnVwUsers')).click();
        element(by.id('btnNewUser')).click();
        
        // create the new user
        element(by.model('user.username')).sendKeys('roomSecurity'); // unique & required
        element(by.model('user.email')).sendKeys('inactive@test.ca');
        element(by.model('user.password')).sendKeys('Test$4test');
        element(by.model('user.active')).click();
        element(by.model('user.name')).sendKeys('E2E test');
        
        element(by.model('user.role')).element(by.cssContainingText('option', 'Full -roomMng')).click();
        
        element(by.id('btnSave')).click();
        
        // Logout
        element(by.id('logoutButton')).click();
        
        // Log new user
        logUser('roomSecurity', 'Test$4test');
    });
    
    it('Testing : seeing detail', function() {
        browser.actions().mouseMove(element(by.id('mnView'))).perform();
        browser.sleep(500);
        element(by.id('mnVwRooms')).click();
        
        element.all(by.repeater('roomList')).last().click();
        browser.sleep(2000);
        expect(element(by.id("details")).getAttribute("class")).toEqual('details');
        expect(element(by.id("details")).getAttribute("style")).toEqual('');
    });
    
    it('Testing : updating with menu call', function() {
        element(by.id('mnAdmin')).click();
        
        browser.actions().mouseMove(element(by.id('mnView'))).perform();
        browser.sleep(500);
        element(by.id('mnVwRooms')).click();
        
        element.all(by.repeater('roomList')).last().click();
        expect(browser.getCurrentUrl()).toMatch("#/admin/rooms");
        
        // TODO: Missing test of the save button : How see the update button when is not autorized to load existing data?!
    });
    
    it('Testing : creating & Deleting', function() {
        browser.actions().mouseMove(element(by.id('mnManage'))).perform();
        browser.sleep(500);
        element(by.id('mnRooms')).click();
        
        expect(element(by.id("btnSave")).isPresent()).toBeFalsy();
        expect(element(by.id("btnDelete")).isPresent()).toBeFalsy();
    });
    
    afterAll(function() {
        // delete the user create
        browser.actions().mouseMove(element(by.id('mnUser'))).perform();
        browser.sleep(500);
        element(by.id('mnVwUsers')).click();
        
        element.all(by.repeater('userList')).last().click();
        element(by.id('btnDelete')).click();
        
        // delete the user's role
        browser.actions().mouseMove(element(by.id('mnUser'))).perform();
        browser.sleep(500);
        element(by.id('mnRoles')).click();
        
        element.all(by.repeater('userRoleList')).last().click();
        element(by.id('btnDelete')).click();
    });
});