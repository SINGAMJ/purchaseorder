sap.ui.define([
    "sap/ui/core/util/MockServer",
    "sap/base/Log"
], function (MockServer, Log) {
    "use strict";

    var _sAppPath = "com/apple/scp/purchaseorder/",
        _sJsonFilesPath = _sAppPath + "localService";

    return {
        /**
         * mockserver creation
         * @returns {sap.ui.core.util.MockServer} an initialized and started mockserver
         */

        init: function () {
            var sJsonFilesUrl = sap.ui.require.toUrl(_sJsonFilesPath),
                sManifestUrl = sap.ui.require.toUrl(_sAppPath + "manifest.json"),
                oManifest = jQuery.sap.syncGetJSON(sManifestUrl).data,
                oMainDataSource = oManifest["sap.app"].dataSources.mainService,
                sMetadataUrl = sap.ui.require.toUrl(_sAppPath + oMainDataSource.settings.localUri);

            this.sMockServerUrl = oMainDataSource.uri;

            // init root URI
            this.oMockServer = new MockServer({
                rootUri: this.sMockServerUrl
            });

            // configure mock server with a potential delay
            MockServer.config({
                autoRespond: true
            });

            // load local mock data (if there's any)
            this.oMockServer.simulate(sMetadataUrl, {
                sMockdataBaseUrl: sJsonFilesUrl,

                aEntitySetsNames: ["POHeaders", "POItems", "RemoveDuplicatePurchaseOrder"],
                bGenerateMissingMockData: false
            });

            this.oMockServer.start();

            Log.info("MockServer started w/\n" +
                "   baseURL: " + this.sMockServerUrl + "\n" +
                "   metadata from " + sMetadataUrl + "\n" +
                "   mockdata dir: " + sJsonFilesUrl);

            return this;
        }
    };

});