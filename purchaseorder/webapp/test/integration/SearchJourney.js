/* global QUnit */

sap.ui.define([
    "sap/ui/test/opaQunit",
    "sap/ui/test/Opa5",
    "com/apple/scp/purchaseorder/test/integration/pages/PurchaseOrder",
    "com/apple/scp/purchaseorder/test/integration/arrangements/Startup"
], function (opaTest, Opa5) {
    "use strict";

    QUnit.module("Filter and Search");

    opaTest("Should show correct item count after PO search (1)", function (Given, When, Then) {
        // Arrangements
        Given.iStartMyAppInAFrame("../../index.html?responderOn=true").done(function () {
            Opa5.assert.ok(document.getElementById("OpaFrame"), "The frame to be loaded");
        });
        //Actions
        When.onThePOPage.iEnterPOForSearchAndPressEnter("0618248265");

        // Assertions
        Then.onThePOPage.iShouldSeeItemCount(1).and.iTeardownMyApp();
    });

    opaTest("Should show correct item count after PO search (0)", function (Given, When, Then) {
        // Arrangements
        Given.iStartMyAppInAFrame("../../index.html?responderOn=true").done(function () {
            Opa5.assert.ok(document.getElementById("OpaFrame"), "The frame to be loaded");
        });
         //Actions
         When.onThePOPage.iEnterPOForSearchAndPressEnter("0718248265");
         // Assertions
         Then.onThePOPage.iShouldSeeItemCount(0).and.iTeardownMyApp();
    });

    opaTest("Should show correct item count after Date search (1)", function (Given, When, Then) {
        // Arrangements
        Given.iStartMyAppInAFrame("../../index.html?responderOn=true").done(function () {
            Opa5.assert.ok(document.getElementById("OpaFrame"), "The frame to be loaded");
        });
         //Actions
         When.onThePOPage.iEnterDateForSearchAndPressEnter("Jan 7, 2021 - Jan 8, 2021");
         // Assertions
         Then.onThePOPage.iShouldSeeItemCount(1).and.iTeardownMyApp();
    });
});