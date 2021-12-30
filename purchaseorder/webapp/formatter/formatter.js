sap.ui.define([
    "sap/ui/core/format/DateFormat"
], function () {
    "use strict";

    var util = {};
    util.statusColor = function(status){
        switch(status){
            case "OPEN":
                return sap.ui.core.ValueState.Information;
            case "DELIVERED":
                return sap.ui.core.ValueState.Success;
            default:
                return sap.ui.core.ValueState.Warning;
        }
    };
    util.formatDate = function(dateValue){
        try {
            var date = dateValue.substring(0,4) +"-"+ dateValue.substring(4,6)+"-"+ dateValue.substring(6,8);
            var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
            var oDate = new Date(date);
            if(oDate  == "Invalid Date"){
                return dateValue;
            }else{
                var formattedDate = months[dateValue.substring(4,6) - 1] + " " +dateValue.substring(6,8)+ ' , ' +dateValue.substring(0,4);
                return formattedDate;
            }
            
        } catch (oError) {
            return dateValue;
        }
        
    };
    return util;
});