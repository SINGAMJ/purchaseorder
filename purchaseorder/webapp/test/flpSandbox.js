sap.ui.define([
"sap/base/util/ObjectPath",
"sap/ushell/services/Container"
], function (ObjectPath) {
"use strict";
ObjectPath.set(["sap-ushell-config"], {
defaultRenderer: "fiori2",
bootstrapPlugins: {
"RuntimeAuthoringPlugin": {
component: "sap.ushell.plugins.rta",
config: {
validateAppVersion: false
}
},
"PersonalizePlugin": {
component: "sap.ushell.plugins.rta-personalize",
config: {
validateAppVersion: false
}
}
},
renderers: {
fiori2: {
componentData: {
config: {
enableSearch: false,
rootIntent: "Shell-home"
}
}
}
},
        services: {
            "LaunchPage": {
                "adapter": {
                    "config": {
                        "groups": [{
                            "tiles": [{
                                "tileType": "sap.ushell.ui.tile.StaticTile",
                                "properties": {
                                    "title": "Purchase Order",
                                    "targetURL": "#PurchaseOrder-display"
                                }
                            }]
                        }]
                    }
                }
            },
            "ClientSideTargetResolution": {
                "adapter": {
                    "config": {
                        "inbounds": {
                            "PurchaseOrder-display": {
                                "semanticObject": "PurchaseOrder",
                                "action": "display",
                                "description": "A Fiori application.",
                                "title": "Purchase Order",
                                "signature": {
                                    "parameters": {}
                                },
                                "resolutionResult": {
                                    "applicationType": "SAPUI5",
                                    "additionalInformation": "SAPUI5.Component=com.apple.scp.purchaseorder",
                                    "url": sap.ui.require.toUrl("com/apple/scp/purchaseorder")
                                }
                            }
                        }
                    }
                }
            },
            NavTargetResolution: {
                config: {
                    "enableClientSideTargetResolution": true
                }
            }
        }
    });

    var oFlpSandbox = {
        init: function () {
            if (!this._oBootstrapFinished) {
                this._oBootstrapFinished = sap.ushell.bootstrap("local");
                this._oBootstrapFinished.then(function () {
                    sap.ushell.Container.createRenderer().placeAt("content");
                });
            }

            return this._oBootstrapFinished;
        }
    };

    return oFlpSandbox;
});