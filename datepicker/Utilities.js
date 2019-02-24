
var Utility = new function() {
    this.isIE = function() {
        var bname = navigator.appName;
        var isIE = false;
        if (bname == "Microsoft Internet Explorer") {
            isIE = true;
        }
        else {
            isIE = false;
        }
        return isIE;
    }
    this.stopEvent = function(e) {
        if (!e) e = window.event;
        if (e.stopPropagation) {
            e.stopPropagation();
        } else {
            e.cancelBubble = true;
        }
    }

    this.cancelEvent = function(e) {
        if (!e) e = window.event;
        if (e.preventDefault) {
            e.preventDefault();
        } else {
            e.returnValue = false;
        }
    }
}