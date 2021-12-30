sap.ui.define([
    "sap/ui/test/Opa5",
    "sap/ui/test/actions/EnterText",
    "sap/ui/test/matchers/AggregationLengthEquals",
    "sap/ui/test/actions/Press",
    "sap/ui/test/matchers/PropertyStrictEquals"

], function (opa5, EnterText, AggregationLengthEquals, Press, PropertyStrictEquals) {
    "use strict";
    var sViewName = "PurchaseOrder";
    var sPOInputId = "container-purchaseorder---PurchaseOrder--smartFilterBar-filterItemControl_BASIC-PO";
    var sDateInputId = "container-purchaseorder---PurchaseOrder--smartFilterBar-filterItemControl_BASIC-Created_On";
    var sTableId = "innerTable";

    opa5.createPageObjects({
        onThePOPage: {

            actions: {
                iClickOnSearchAndTableItemByFieldValue: function (fValue) {
                    return this.waitFor({
                        id: sPOInputId,
                        viewName: sViewName,
                        actions: [new EnterText({ text: fValue, pressEnterKey: true })],
                        success: function(){
                            this.waitFor({
                                viewName: sViewName,
                                id: "idSearch",
                                actions: new Press(),
                                success: function(){
                                    this.waitFor({
                                        controlType: "sap.m.Link",
            
                                        matchers: [
                                            new PropertyStrictEquals({
                                                name: "text",
                                                value: fValue
                                            })
                                        ],
                                        success: function(oLink) {
                                            oLink[0].firePress();
                                            opa5.assert.ok(true, "PO " + fValue + " clicked successfully");
                                        },
                                        errorMessage: "Cell could not be found in the table"
                                     });
                                },
                                errorMessage: "Did not find the search Button"
                            });
                        },
                        errorMessage: "The PO Number cannot be entered"
                    }); 
                },

                iEnterPOForSearchAndPressEnter: function (poNum) {
                    return this.waitFor({
                        id: sPOInputId,
                        viewName: sViewName,
                        actions: [new EnterText({ text: poNum, pressEnterKey: true })],
                        errorMessage: "The PO Number cannot be entered"
                    });
                },

                iEnterDateForSearchAndPressEnter: function (dRange) {
                    return this.waitFor({
                        id: sDateInputId,
                        viewName: sViewName,
                        actions: [new EnterText({ text: dRange, pressEnterKey: true })],
                        errorMessage: "The Date range cannot be entered"
                    });
                },

                iClickOnTableItemByFieldValue: function (fName, fValue) {
                    return this.waitFor({
                        controlType: "sap.m.ColumnListItem",

                        // Retrieve all list items in the table
                        matchers: [function(oCandidateListItem) {
                            var oTableLine = {};
                            oTableLine = oCandidateListItem.getBindingContext().getObject();
                            var sFound = false;

                            // Iterate through the list items until the specified cell is found
                            for (var sName in oTableLine) {
                                if ((sName === fName) && (oTableLine[sName].toString() === fValue)) {
                                     QUnit.ok(true, "Cell has been found");
                                    sFound = true;
                                    break;
                                }
                            }
                            return sFound;
                        }],

                        // Click on the specified item
                        actions: new Press(),
                        errorMessage: "Cell could not be found in the table"
                     });
                }
            },

            assertions: {
                iShouldSeePurchaseOrder: function () {
                    return this.waitFor({
                        viewName: sViewName,
                        success: function () {
                            opa5.assert.ok(true, "The " + sViewName + " view is displayed");
                        },
                        errorMessage: "Did not find the " + sViewName + " view"
                    });
                },

                iShouldSeeItemCount: function (iItemCount) {
                    return this.waitFor({
                        id: sTableId,
                        viewName: sViewName,
                        matchers: [new AggregationLengthEquals({
                            name: "items",
                            length: iItemCount
                        })],
                        success: function () {
                            opa5.assert.ok(true, "The table has " + iItemCount + " item(s)");
                        },
                        errorMessage: "Table does not have expected number of items '" + iItemCount + "'."
                    });
                }

            }
        }
    });

});
