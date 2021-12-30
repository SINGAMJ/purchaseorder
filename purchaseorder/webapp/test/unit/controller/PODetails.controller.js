
sap.ui.define([
    "sap/ui/base/ManagedObject",
    "com/apple/scp/purchaseorder/controller/PODetails.controller",
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/util/MockServer",
], function (ManagedObject, Controller, aController, oMockServer) {
    "use strict";
    QUnit.module("PODetails Controller", {
        beforeEach: function () {
            this.oPODetailsController = new Controller();
        },
        afterEach: function () {
            this.oPODetailsController.destroy();
        }
    });

    QUnit.test("PODetails controller Load", function (assert) {
        this.oPODetailsController = new Controller();
        assert.ok(this.oPODetailsController);

        //Check for onInit
        // Arrange
        var oViewStub = new ManagedObject({});

        var oRouterStub = new sap.m.routing.Router([
            {
                "name": "PurchaseOrder",
                "pattern": "",
                "target": [
                    "PurchaseOrder"
                ]
            },
            {
                "name": "PODetails",
                "pattern": "PODetails/{po}",
                "target": [
                    "PODetails"
                ]
            }
        ]);
        var oGetViewStub = sinon.stub(aController.prototype, "getView").returns(oViewStub);
        var oGetRouterStub = sinon.stub(this.oPODetailsController, "getRouter").returns(oRouterStub);

        // action
        this.oPODetailsController.onInit();

        // assertions
        assert.ok(this.oPODetailsController.oBusyDialog);

        //CleanUp
        oGetViewStub.restore();
        oGetRouterStub.restore();
    });

    QUnit.test("navigateToPO function test", function (assert) {
        var oRouter = new sap.m.routing.Router([
            {
                "name": "PurchaseOrder",
                "pattern": "",
                "target": [
                    "PurchaseOrder"
                ]
            },
            {
                "name": "PODetails",
                "pattern": "PODetails/{po}",
                "target": [
                    "PODetails"
                ]
            }
        ]);

        //System under test
        var oGetRouterStub = sinon.stub(this.oPODetailsController, "getRouter").returns(oRouter);
        var oRouterSpy = this.stub(sap.ui.core.routing.Router.prototype, "navTo");

        //Actions
        this.oPODetailsController.navigateToPO();

        assert.strictEqual(oRouterSpy.callCount, 1, "Router navigation method to be called");

        //CleanUp
        oGetRouterStub.restore();
        oRouterSpy.restore();
    });

    QUnit.test("setIconBasedOnToogle function test", function (assert) {
        var oViewStub = new ManagedObject({});
        var oGetViewStub = sinon.stub(aController.prototype, "getView").returns(oViewStub);
        var oModel = new sap.ui.model.json.JSONModel({
            "results": [
                {
                    "Item_Text": "ORT IPHONE 5S SPACE GRAY 32GB-BRA",
                    "Line": "00010",
                    "LineItems": [{
                        "results": [
                            {
                                "Delivery_Date": "20210118",
                                "Line": "00010",
                                "Order_date": "20210107",
                                "PO": "0618248265",
                                "Quantity": "1.000",
                                "ScheduleLine": "0001"
                            }
                        ]
                    }
                    ],
                    "Material": "KE435BR/A",
                    "Material_Group": "IPH00",
                    "Open_Quantity": "1",
                    "Order_Quantity": "1.000",
                    "Order_Unit": "EA",
                    "PO": "0618248265",
                    "Plant": "LB10",
                    "Quantity_Delivered": "0.000",
                    "Status": "OPEN",
                    "Stock_Type": "",
                    "Storage_Location": "ORT",
                    "Vendor": "000295ANP",
                    "icon": "sap-icon://navigation-down-arrow"
                }]
        });

        this.stub(ManagedObject.prototype, "getModel").withArgs("lineItemModel").returns(oModel);

        this.oPODetailsController.setIconBasedOnToogle(true);
        var oModel1 = this.oPODetailsController.getView().getModel("lineItemModel");
        assert.strictEqual(oModel1.getData().results[0].icon, "sap-icon://navigation-right-arrow", "Right arrow icon to be set");

        this.oPODetailsController.setIconBasedOnToogle(false);
        var oModel2 = this.oPODetailsController.getView().getModel("lineItemModel");
        assert.strictEqual(oModel2.getData().results[0].icon, "sap-icon://navigation-down-arrow", "Down arrow icon to be set");

        oGetViewStub.restore();
    });
});