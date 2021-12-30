
QUnit.config.autostart = false;
sap.ui.getCore().attachInit(function () {
    "use strict";
    sap.ui.require([
        "com/apple/scp/purchaseorder/test/unit/AllTests"
    ], function () {
        QUnit.start();
    });
});
