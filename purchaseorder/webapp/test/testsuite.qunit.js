/* global window, parent, location */

// eslint-disable-next-line sap-no-global-define
window.suite = function () {
    "use strict";

    // eslint-disable-next-line
    var oSuite = new parent.jsUnitTestSuite(),
        sContextPath = location.pathname.substring(0, location.pathname.lastIndexOf("/") + 1);

    oSuite.title = "PO QUnit tests of suite testsuite";

    oSuite.defaults = {
        page: "test-resources/com/apple/scp/purchaseorder/testsuite.qunit.html?test={name}",
        qunit: {
            version: "edge"
        },
        sinon: {
            version: "edge",
            qunitBridge: true,
            useFakeTimers: false,
            useFakeServer: false
        },
        autostart: false
    };

    oSuite.addTestPage(sContextPath + "unit/unitTests.qunit.html");
    oSuite.addTestPage(sContextPath + "integration/opaTests.qunit.html");

    return oSuite;
};