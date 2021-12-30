/*global QUnit*/

sap.ui.require([
    "com/apple/scp/purchaseorder/formatter/formatter"
],
    function (formatter) {
        "use strict";

        QUnit.module("Formatting functions");

        function statusColourTestCase(assert, sValue, fExpectedColor) {
            var msg = "The colour status expected was " + fExpectedColor;
            var fState = formatter.statusColor(sValue);
            assert.strictEqual(fState, fExpectedColor, msg);
        }

        function dateFormatTestCase(assert, sValue, fExpectedDate) {
            var msg = "The date format expected was " + fExpectedDate;
            var fDate = formatter.formatDate(sValue);
            assert.strictEqual(fDate, fExpectedDate, msg);
        }

        QUnit.test("Should return correct Status Color", function (assert) {
            statusColourTestCase.call(this, assert, "OPEN", "Information");
            statusColourTestCase.call(this, assert, "DELIVERED", "Success");
            statusColourTestCase.call(this, assert, "SCHEDULED", "Warning");
        });

        QUnit.test("Should return correct formatted Date", function (assert) {
            dateFormatTestCase.call(this, assert, "20000101", "Jan 1, 2000");
            dateFormatTestCase.call(this, assert, "19901231", "Dec 31, 1990");
        });

        QUnit.test("Invalid Date test", function (assert){
            dateFormatTestCase.call(this, assert, "20000199", "20000199");
            dateFormatTestCase.call(this, assert, "200", "200");
        });

    }
);