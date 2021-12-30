sap.ui.define([
    "./BaseController",
    "sap/ui/model/json/JSONModel",
    "com/apple/scp/purchaseorder/formatter/formatter",
    "sap/m/BusyDialog"
], function (BaseController, JSONModel, formatter, BusyDialog) {
    "use strict";

    return BaseController.extend("com.apple.scp.purchaseorder.controller.PODetails", {
        formatter: formatter,
        onInit: function () {
            var oScheduleVisibility = new JSONModel({ "scheduleVisibility": true });
            this.getView().setModel(oScheduleVisibility, "scheduleVisibilityModel");
            this.oBusyDialog = new BusyDialog();
            var oRouter = this.getRouter();
            oRouter.getRoute("PODetails").attachMatched(this.onRouteMatched, this);
        },
        onRouteMatched: function (oEvent) {
            var oArgs = oEvent.getParameter("arguments");
            //get the route parameter
            var oPurchaseOrder = oArgs.po;
            var oModelJson = new JSONModel({
                'purchaseOrder': oPurchaseOrder
            });
            this.getView().setModel(oModelJson, "PurchaseOrderParamModel");
            this.getScheduleLineData(oArgs.po);
            this.headerData(oArgs.po);
        },
        // Get the PO header details data
        headerData: function (po) {
            var that = this;
            var oPOFilter = new sap.ui.model.Filter("PO", sap.ui.model.FilterOperator.EQ, po);
            var sPath = "/POHeaders";
            var oPromise = new Promise(function (resolve, reject) {
                that.oDataModel.read(sPath, {
                    urlParameters: "$expand=ShipFrom,ShipTo",
                    filters: [oPOFilter],
                    success: function (oData) {
                        resolve(oData);
                    },
                    error: function (oError) {
                        reject(oError);
                    }
                });
            });
            oPromise.then(function (oData) {
                console.log(oData);
                var oModel = new JSONModel(oData);
                that.getView().setModel(oModel, "headerModel");
            }, function (oError) {
                console.log(oError);
            });
            
            return oPromise;
        },
        // get the schedule line items data 
        getScheduleLineData: function (po) {
            var that = this;
            this.oBusyDialog.open();
            var sPath = "/POItems";
            var oPOFilter = new sap.ui.model.Filter("PO", sap.ui.model.FilterOperator.EQ, po);
            this.oDataModel = this.getOwnerComponent().getModel();
            var oPromise = new Promise(function (resolve, reject) {
                that.oDataModel.read(sPath, {
                    urlParameters: "$expand=LineItems",
                    filters: [oPOFilter],
                    success: function (oData) {
                        console.log(oData);
                        resolve(oData);
                    },
                    error: function (oError) {
                        console.log(oError);
                        reject();
                    }
                });
            });
            oPromise.then(function (oData) {
                that.addIconField(oData);
                that.oBusyDialog.close();
            }, function () {
                that.oBusyDialog.close();
            });

            return oPromise;

        },
        addIconField: function (oData) {
            oData.results.forEach(function (oValue) {
                oValue.icon = "sap-icon://navigation-down-arrow";
            });
            var oModel = new JSONModel(oData);
            this.getView().setModel(oModel, "lineItemModel");
        },
        onRowShiftAction: function (oEvent) {
            var oSource = oEvent.getSource(),
                oRow = oSource.getParent();
            if (oSource.getSrc() === "sap-icon://navigation-right-arrow") {
                oSource.setSrc("sap-icon://navigation-down-arrow");
                oRow.getCells()[9].setVisible(true);
            } else {
                oSource.setSrc("sap-icon://navigation-right-arrow");
                oRow.getCells()[9].setVisible(false);
            }
        },
        //Expand or Collpase Schedule Table
        toggleScheduleTable: function (oEvent) {
            var oToggleScheduleVisibility = this.getView().getModel("scheduleVisibilityModel").getProperty('/scheduleVisibility');
            if (oToggleScheduleVisibility) {

                oEvent.getSource().setText(this.getResourceBundle("buttonExpandScheduleText"));
            } else {
                oEvent.getSource().setText(this.getResourceBundle("buttonCollapseScheduleText"));
            }
            this.setIconBasedOnToogle(oToggleScheduleVisibility);
            this.getView().getModel("scheduleVisibilityModel").setProperty('/scheduleVisibility', !oToggleScheduleVisibility);
        },
        //Set the Icon based on the schedule table visiblity
        setIconBasedOnToogle: function (oToggleScheduleVisibility) {
            var oModelData = this.getView().getModel("lineItemModel").getData();
            var oIcon = oToggleScheduleVisibility ? "sap-icon://navigation-right-arrow" : "sap-icon://navigation-down-arrow";
            oModelData.results.forEach(function (oValue) {
                oValue.icon = oIcon;
            });
            this.getView().setModel(new JSONModel(oModelData), "lineItemModel");
        },
        navigateToPO: function () {
            this.getRouter().navTo("PurchaseOrder");
        },

    });
});