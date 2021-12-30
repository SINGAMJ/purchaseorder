
sap.ui.define([
    "sap/ui/core/mvc/View",
    "com/apple/scp/purchaseorder/controller/PurchaseOrder.controller",
    "sap/ui/core/mvc/Controller",
    "sap/ui/comp/smartfilterbar/SmartFilterBar",
    "sap/ui/comp/smarttable/SmartTable"
], function (ManagedObject, Controller, aController, sFB, sTable) {
    "use strict";
    QUnit.module("PurchaseOrder Controller", {
        beforeEach: function () {
            this.oPOController = new Controller();
        },
        afterEach: function () {
            this.oPOController.destroy();
        }
    });
    QUnit.test("PurchaseOrder controller Load", function (assert) {
        assert.ok(this.oPOController);
    });

    QUnit.test("formatDateAsString function test", function (assert) {
        const date1 = new Date(2021, 10, 24, 5, 30, 0, 0);
        const date2 = new Date(2021, 10, 5, 5, 30, 0, 0);
        const date3 = new Date(2021, 8, 24, 5, 30, 0, 0);

        var actDate = this.oPOController.formatDateAsString(date1);
        assert.strictEqual(actDate, "20211124", "Standalone JS Date conversion to YYYYMMDD");

        var actDate = this.oPOController.formatDateAsString(date2);
        assert.strictEqual(actDate, "20211105", "Standalone JS Date with single digit date, conversion to YYYYMMDD");

        var actDate = this.oPOController.formatDateAsString(date3);
        assert.strictEqual(actDate, "20210924", "Standalone JS Date with single digit month, conversion to YYYYMMDD");
    });

    QUnit.test("filterFormatting function test", function (assert) {
        const date1 = new Date(2021, 10, 24, 5, 30, 0, 0);
        const date2 = new Date(2021, 10, 26, 5, 29, 59, 0);
        var inputArray = {
            "aFilters": [{
                "aFilters": [{
                    "oValue1": "DELIVERED",
                    "oValue2": undefined,
                    "sOperator": "EQ",
                    "sPath": "Status",
                    "_bMultiFilter": false
                }]
            }, {
                "oValue1": date1,
                "oValue2": date2,
                "sOperator": "BT",
                "sPath": "Created_On",
                "_bMultiFilter": false
            }]
        };
        var exOutputArray = {
            "aFilters": [{
                "aFilters": [{
                    "oValue1": "DELIVERED",
                    "oValue2": undefined,
                    "sOperator": "EQ",
                    "sPath": "Status",
                    "_bMultiFilter": false
                }]
            }, {
                "oValue1": "20211124",
                "oValue2": "20211126",
                "sOperator": "BT",
                "sPath": "Created_On",
                "_bMultiFilter": false
            }]
        };

        this.oPOController.filterFormatting(inputArray);
        assert.deepEqual(inputArray, exOutputArray, "Dates in array expected to be formatted from JS format to YYYYMMDD");
    });

    QUnit.test("Smart Table search test", function (assert) {
        //Arrange
        var oSTable = new sTable("sTable");
        var oViewStub = new ManagedObject({});
        var oSTableSpy = this.stub(sap.ui.comp.smarttable.SmartTable.prototype, "rebindTable");
        var oGetViewStub = sinon.stub(aController.prototype, "getView").returns(oViewStub);
        var oSTableStub = sinon.stub(ManagedObject.prototype, "byId").returns(oSTable);

        //Act
        this.oPOController.onSearchPo();

        //Assert
        assert.strictEqual(oSTableSpy.callCount, 1, "Smart Table rebindTable event to be triggered");

        //CleanUp
        oSTableSpy.restore();
        oSTableStub.restore();
        oGetViewStub.restore();
    });

    QUnit.test("Smart Filter Bar clear test", function (assert) {
        //Arrange
        var oSFB = new sFB("SFB");
        var oViewStub = new ManagedObject({});
        var oSFBSpy = this.stub(sap.ui.comp.smartfilterbar.SmartFilterBar.prototype, "clear");
        var oGetViewStub = sinon.stub(aController.prototype, "getView").returns(oViewStub);
        var oSFBStub = sinon.stub(ManagedObject.prototype, "byId").returns(oSFB);

        //Act
        this.oPOController.onClear();

        //Assert
        assert.strictEqual(oSFBSpy.callCount, 1, "Smart Filter Bar clear to be triggered");

        //CleanUp
        oSFBSpy.restore();
        oSFBStub.restore();
        oGetViewStub.restore();
    });
});
