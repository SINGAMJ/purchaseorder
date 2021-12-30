sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/Device",
    "com/apple/scp/purchaseorder/model/models",
    "sap/base/util/UriParameters",
    "com/apple/scp/purchaseorder/localService/mockserver",
    "sap/ui/model/odata/v2/ODataModel"
], function (UIComponent, Device, models, UriParameters, MockServer, ODataModel) {
    "use strict";
    return UIComponent.extend("com.apple.scp.purchaseorder.Component", {
        metadata: {
            manifest: "json"
        },
        init: function () {
            // call the base component's init function
            UIComponent.prototype.init.apply(this, arguments);
            // enable routing
            this.getRouter().initialize();
            // set the device model
            this.setModel(models.createDeviceModel(), "device");

            this.isMock = UriParameters.fromURL(window.location.href).get("responderOn");
            if (this.isMock) {
                //Start Mock Server
                this.oMockserver = MockServer.init();

                //Set Mockmodel to Component
                var oModel = new ODataModel(this.oMockserver.sMockServerUrl, {
                    json: true
                });

                this.setModel(oModel);
            } else {
                this.fetchAppId();
            }
        },

        fetchAppId: function () {
            var that = this;
            fetch("/getAppVariables").then(
                resp => resp.json()).then(
                    appId => {
                        that.loadMetadataWithAppID(appId);
                    });
        },

        loadMetadataWithAppID: function (appId) {
            var oParameters = {
                defaultBindingMode: "TwoWay",
                disableHeadRequestForToken: true,
                headers: {
                    appID: appId
                }
            };

            var sUri = this.getManifestEntry("/sap.app/dataSources/mainService").uri;
            var oModel = new sap.ui.model.odata.v2.ODataModel(sUri, oParameters);
            this.setModel(oModel);
        }
    });
});
