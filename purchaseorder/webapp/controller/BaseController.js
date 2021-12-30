sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent"
], function (Controller, UIComponent) {
    "use strict";

    return Controller.extend("com.apple.scp.purchaseorder.controller.BaseController", {
        getRouter: function () {
            return UIComponent.getRouterFor(this);
        },
        getResourceBundle: function (text) {
            return this.getOwnerComponent().getModel("i18n").getResourceBundle().getText(text);
        }
    });
});
