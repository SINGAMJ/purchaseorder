sap.ui.define([
    "sap/ui/test/Opa5",
    "sap/ui/test/actions/Press",
    "sap/ui/test/matchers/Properties"
], function (Opa5, Press, Properties) {
    "use strict";
    var sViewName = "PODetails";
    Opa5.createPageObjects({
        onThePODetailsPage: {

            actions: {
                iClickOnBack: function () {
                    return this.waitFor({
                        id: "pDBack",
                        viewName: sViewName,
                        actions: new Press(),
                        errorMessage: "Back button not found"
                    });
                },
                
                iClickonSLToggleButton: function () {
                    return this.waitFor({
                        id: "idToggleSLTable",
                        viewName: sViewName,
                        actions: new Press(),
                        errorMessage: "Schedule line Toggle button not found"
                    });
                },
                iClickOnRowShiftIcon: function (isCollapse) {
                    var icon = isCollapse ? "sap-icon://navigation-down-arrow" : "sap-icon://navigation-right-arrow";
                    return this.waitFor({
                        viewName: sViewName,
                        controlType: "sap.ui.core.Icon",
                        matchers: [
                            new Properties({ src: icon })
                        ],
                        actions: new Press(),
                        errorMessage: "Icon not found"
                    });
                }
            },

            assertions: {
                iShouldSeeThePODetails: function () {
                    return this.waitFor({
                        viewName: sViewName,
                        success: function () {
                            Opa5.assert.ok(true, "The " + sViewName + " view is displayed");
                        },
                        errorMessage: "Did not find the " + sViewName + " view"
                    });
                }
            }
        }
    });

});
