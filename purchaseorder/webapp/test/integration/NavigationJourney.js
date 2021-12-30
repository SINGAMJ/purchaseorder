/*global QUnit*/

sap.ui.define([
    "sap/ui/test/opaQunit",
    "sap/ui/test/Opa5",
    "./pages/App",
    "./pages/PurchaseOrder",
    "./pages/PODetails",
], function (opaTest, Opa5) {
    "use strict";

    QUnit.module("Navigation Journey");

    function jsonOk(body) {
        var mockResponse = new window.Response(JSON.stringify(body), { //the fetch API returns a resolved window Response object
            status: 200,
            headers: {
                'Content-type': 'application/json'
            }
        });

        return Promise.resolve(mockResponse);
    };

    opaTest("Should see the initial page of the app", function (Given, When, Then) {
        let stub = sinon.stub(window, 'fetch'); //add stub
        stub.onCall(0).returns(jsonOk({ "AppID": '123' }));

        Given.iStartMyApp();

        // Assertions
        Then.onTheAppPage.iShouldSeeTheApp();

        //Cleanup
        Then.iTeardownMyApp();
    });

    opaTest("Should navigate to PO Details page, perform actions and back to PO page", function (Given, When, Then) {
        // Arrangements
        Given.iStartMyAppInAFrame("../../index.html?responderOn=true").done(function () {
            Opa5.assert.ok(document.getElementById("OpaFrame"), "The frame to be loaded");
        });

        //Actions
        When.onThePOPage.iClickOnSearchAndTableItemByFieldValue("0618248265");
        // Assertions
        Then.onThePODetailsPage.iShouldSeeThePODetails();

        When.onThePODetailsPage.iClickOnRowShiftIcon(true).and.iClickOnRowShiftIcon(false).and.iClickonSLToggleButton().and.iClickonSLToggleButton().and.iClickOnBack();
        Then.onThePOPage.iShouldSeePurchaseOrder();

        Then.iTeardownMyApp();
    });


});
