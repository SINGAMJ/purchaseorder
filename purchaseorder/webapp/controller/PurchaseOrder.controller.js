sap.ui.define([
    "./BaseController",
    "com/apple/scp/purchaseorder/formatter/formatter",
],
    function (BaseController, formatter) {
        "use strict";

        return BaseController.extend("com.apple.scp.purchaseorder.controller.PurchaseOrder", {
            formatter: formatter,
            
            filterIntialise: function () {
                this.getView().byId("smartFilterBar").getControlByKey("Created_On").setDisplayFormat("MMM d, yyyy");
            },
            beforeTableRebind: function (oEvent) {
                var oBindingParams = oEvent.getParameter("bindingParams");
                var that = this;

                //Formatting the date from the date picker based on the number of filters
                var filterArray = oBindingParams.filters;
                var filterOutLength = filterArray.length;
                if (filterOutLength > 0) {

                    var filterArrayPath = oBindingParams.filters[0];
                    var filterVal1 = filterArrayPath.oValue1;
                    var filterVal2 = this.getView().byId("smartFilterBar").getControlByKey("Created_On").getTo();
                    if (filterOutLength === 1 && filterArrayPath.sPath === "Created_On") {
                        filterArrayPath.oValue1 = that.formatDateAsString(filterVal1);
                        filterArrayPath.oValue2 = that.formatDateAsString(filterVal2);
                    } else {
                        that.filterFormatting(filterArrayPath);
                    }

                }
            },
            filterFormatting:function(filterArrayPath){
                var that = this;
                var filterManyArray = filterArrayPath.aFilters;
                var filterManyLength = filterManyArray.length;
                for (var i = 0; i < filterManyLength; i++) {
                    if (filterManyArray[i].sPath === "Created_On") {
                        filterManyArray[i].oValue1 = that.formatDateAsString(filterManyArray[i].oValue1);
                        filterManyArray[i].oValue2 = that.formatDateAsString(that.getView().byId("smartFilterBar").getControlByKey("Created_On").getTo());
                        break;
                    }
                }

            },
            // format date as YYYYMMDD string 
            formatDateAsString: function (dateObject) {
                var year = dateObject.getFullYear();
                var month = dateObject.getMonth() + 1;
                var date = dateObject.getDate();
                if (month < 10) {
                    month = "0" + month;
                } else {
                    month = month + "";
                }
                if (date < 10) {
                    date = "0" + date;
                } else {
                    date = date + "";
                }
                return year + month + date;
            },
            onSearchPo: function () {
                this.getView().byId("poSmartTable").rebindTable(true);
            },
            onClear: function () {
                this.getView().byId('smartFilterBar').clear();
            },
            navigateToPODetails: function (oEvent) {
                var bindingPath = oEvent.getSource().getBindingContext().getPath();
                var rowData = oEvent.getSource().getModel().getProperty(bindingPath);
                this.getRouter().navTo("PODetails", {
                    po: rowData.PO
                });
            },
        });
    });