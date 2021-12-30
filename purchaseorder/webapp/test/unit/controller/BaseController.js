
sap.ui.define([
    "com/apple/scp/purchaseorder/controller/BaseController",
    "sap/ui/model/resource/ResourceModel",
    "sap/ui/core/UIComponent",
    "sap/ui/thirdparty/sinon",
    "sap/ui/thirdparty/sinon-qunit"
], function (Controller, ResourceModel, UIComponent) {
    "use strict";
    QUnit.module("Base Controller", {
        beforeEach: function () {
            this.oBaseController = new Controller();
        },
        afterEach: function () {
            this.oBaseController.destroy();
        }
    }
    );

    QUnit.test("Base controller Load", function (assert) {
        assert.ok(this.oBaseController);
    });

    QUnit.test("Should return the translated texts", function (assert) {
        // Arrange
        this._oResourceModel = new ResourceModel({
            bundleUrl: jQuery.sap.getModulePath("com.apple.scp.purchaseorder", "/i18n/i18n.properties")
        });
        var oCompStub = {
            getModel: this.stub().withArgs("i18n").returns(this._oResourceModel)
        };
        var oControllerStub = {
            getOwnerComponent: this.stub().returns(oCompStub)
        };

        // System under test
        var fnIsolatedFormatter = this.oBaseController.getResourceBundle.bind(oControllerStub);

        // Assert
        assert.strictEqual(fnIsolatedFormatter("appTitle"), "Apple Puchase Orders", "The long text for Application title is correct");

        //CleanUp
        this._oResourceModel.destroy();
    });

    QUnit.test("Should return the router", function(assert){
         // Arrange
         var olocalRouter = new sap.m.routing.Router([
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
         
         var oCompStub = sinon.stub(UIComponent, "getRouterFor").returns(olocalRouter);
         var aRouter = this.oBaseController.getRouter();
         assert.strictEqual(aRouter, olocalRouter, "Router bound to be returned" );
         oCompStub.restore();

    });

});
