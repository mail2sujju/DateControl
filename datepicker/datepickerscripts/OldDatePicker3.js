var custCal = new function() {
    this.dteCurrDate = new Date();
    this.intMinYear = 0;
    this.intMaxYear = 0;
    this.format = "dd/MM/yyyy";
    var _popupMouseDown = false;
    var _TextBoxMouseDown = false;
    var strReturnFormat = "";
    var DateFormat = {
        "dd/mm/yyyy": 1,
        "mm/dd//yyyy": 2,
        "dd-mmm-yyyy": 3
    }
    var FirstDayOfTheWeek = { "Sunday": 1,
        "Monday": 2,
        "Tuesday": 3,
        "Wednesday": 4,
        "Thursday": 5,
        "Friday": 6,
        "Saturday": 7
    }
    var trgetControlID = "";
    var txtid = "";
    this.ShowDatePicker = function(ForTextBox, FromYear, ToYear, DefaultDate, ReturnFormat) {
        if (ForTextBox == null) return;
        var retVal;
        debugger;
        txtid = ForTextBox.id;
        var currDate = ForTextBox.value;
        var intLeft = ForTextBox.offsetLeft;
        var intTop = ForTextBox.offsetTop + 140;
        if (intLeft > 520) intLeft = 520;
        if (DefaultDate == null || DefaultDate == "") DefaultDate = new Date();
        if (currDate == null || currDate == "") currDate = DefaultDate;
        if (FromYear == null || FromYear == "") FromYear = 1900;
        if (ToYear == null || ToYear == "") ToYear = 2099;
        strReturnFormat = this.format;
        //if (ReturnFormat == null || ReturnFormat == "") ReturnFormat = "dd/mm/yyyy";
        //    retVal = window.showModalDialog("Miscellaneous/DatePicker.htm", FromYear + "~" + ToYear + "~" + currDate + "~" + ReturnFormat, strFeatures);
        if (!document.getElementById('dvCalendar')) {
            var maindiv = document.createElement('DIV');
            maindiv.id = "dvCalendar";
            maindiv.className = "DivCalender";
            var mainTable = custCal.createCalender();
            maindiv.appendChild(mainTable);
            document.body.appendChild(maindiv)
            document.getElementById('dvCalendar').style.display = "none";
        }
        if (document.getElementById('dvCalendar').style.display != "block") {
            document.getElementById('dvCalendar').style.display = "block";
            var params = FromYear + "~" + ToYear + "~" + currDate + "~" + this.format;

            var postions = custCal.getPosition(ForTextBox);
            document.getElementById('dvCalendar').style.left = postions[0] + "px";
            document.getElementById('dvCalendar').style.top = postions[1] + "px";
            // document.getElementById('dvCalendar').style.position = "absolute";
            custCal.funInitialize(params);
        }
        ForTextBox.onmousedown = function() {
            custCal.openCalender();
        }
        ForTextBox.onmouseup = function() {
            custCal.ChangeBull();
        }
        document.getElementById('dvCalendar').onmousedown = function() {
            custCal.maindivMouseDown();
        }
        document.getElementById('dvCalendar').onmouseup = function() {
            custCal.maindivMouseUp();
        }
        document.onmousedown = function() {
            custCal.documentMouseDown();
        }
        ForTextBox.onblur = function() {
            custCal.closeclander();
        }
        ForTextBox.onkeydown = function(event) {
            custCal.TextboxkeyDown(event);
        }
    }
    this.documentMouseDown = function() {
        if (!_popupMouseDown && !_TextBoxMouseDown) {
            document.getElementById('dvCalendar').style.display = "none";
        }
    }
    this.mainTableMouseDown = function() {
        _popupMouseDown = true;
    }
    this.mainTableMouseUp = function() {
        _popupMouseDown = true;
    }
    this.openCalender = function() {
        _TextBoxMouseDown = true;
    }
    this.ChangeBull = function() {
        _TextBoxMouseDown = false;
    }
    this.maindivMouseDown = function() {
        _popupMouseDown = true;
    }
    this.maindivMouseUp = function() {
        _popupMouseDown = false;
    }
    this.closeclander = function() {
        if (!_popupMouseDown) {
            document.getElementById('dvCalendar').style.display = "none";
        }
    }

    this.TextboxkeyDown = function(ev) {
        var datevalue = document.getElementById(txtid).value;
        if (ev.which == 37) {
            if (datevalue != "") {
                var txtvalule = document.getElementById(txtid).value;
                var dteTemp = new Date(datevalue);
                if (dteTemp != 'Invalid Date') {
                    var ipos = 0; var ilength = 0;
                    var strSep = '-';
                    if (txtvalule.indexOf(strSep) == -1) {
                        strSep = '/';
                    }
                    var bflag = false;
                    debugger;
                    ilength = document.getElementById(txtid).selectionStart;
                    for (var index = txtvalule.length; index >= 0; index--) {
                        if (index <= ilength) {
                            if (txtvalule.charAt(index).toString() == strSep) {
                                bflag = true;
                                ilength = index;
                                break;
                            }
                        }
                    }
                    if (bflag == true) {
                        // var val = txtvalule.length - ipos;
                        var strsubstring = txtvalule.substring(0, ilength);
                        if (strsubstring.indexOf(strSep) > -1) {
                            ipos = strsubstring.indexOf(strSep) + 1;
                        }
                        else {
                            ipos = 0;
                        }
                    }
                    else {
                        ipos = txtvalule.lastIndexOf(strSep) + 1;
                        ilength = txtvalule.length;
                    }
                    document.getElementById(txtid).focus();
                    document.getElementById(txtid).setSelectionRange(ipos, ilength);
                    ev.preventDefault();
                    ev.stopPropagation();
                }
                else {
                    ev.preventDefault();
                    ev.stopPropagation();
                }
            }
        }
        else if (ev.which == 38) {
            var dteTemp = new Date(datevalue);
            if (dteTemp != 'Invalid Date') {
                var ipos = 0; var ilength = 0; var iend = 0;
                ipos = document.getElementById(txtid).selectionStart;
                iend = document.getElementById(txtid).selectionEnd;
                if (iend - ipos >= 0) {
                    var txtval = document.getElementById(txtid).value;
                    var strSep = '-';
                    if (txtval.indexOf(strSep) == -1) {
                        strSep = '/';
                    }
                    var strArray = datevalue.split(strSep);
                    var posEle = txtval.substring(ipos, iend);
                    var part = this.format.substring(ipos, iend).toUpperCase();
                    var parArray = this.format.split(strSep);
                    var returnval = "0";
                    var strDay = "", strMonth = "", strYear = "";
                    for (var index = 0; index < parArray.length; index++) {
                        switch (parArray[index].toUpperCase()) {
                            case "MM": strMonth = strArray[index];
                                break;
                            case "YY": strYear = strArray[index];
                                break;
                            case "YYYY": strYear = strArray[index];
                                break;
                            case "MMM": strMonth = strArray[index];
                                break;
                            case "DD": strDay = strArray[index];
                                break;
                        }
                    }
                    switch (part) {
                        case "MM": returnval = custCal.MonthInceremt(posEle);
                            break;
                        case "YY": returnval = custCal.yearIncrement(posEle);
                            break;
                        case "YYYY": returnval = custCal.yearIncrement(posEle);
                            break;
                        case "MMM": returnval = custCal.MonthInceremt(posEle);
                            break;
                        case "DD": returnval = custCal.DayIncrement(posEle, strMonth, strYear);
                            break;
                    }

                    switch (part) {

                        case parArray[0].toUpperCase(): strArray[0] = returnval;
                            break;
                        case parArray[1].toUpperCase(): strArray[1] = returnval;
                            break;
                        case parArray[2].toUpperCase(): strArray[2] = returnval;
                            break;
                    }
                    document.getElementById(txtid).value = strArray[0] + strSep + strArray[1] + strSep + strArray[2];
                    var setDate = custCal.funGetCompatibleDate(document.getElementById(txtid).value);
                    var newDate = new Date(setDate);
                    custCal.funShowCalender(newDate);
                    document.getElementById(txtid).setSelectionRange(ipos, iend);
                    ev.preventDefault();
                    ev.stopPropagation();
                }
            }
            else {
                ev.preventDefault();
                ev.stopPropagation();
            }
        }
        else if (ev.which == 39) {
            var txtvalule = document.getElementById(txtid).value;
            var dteTemp = new Date(datevalue);
            if (dteTemp != 'Invalid Date') {
                var ipos = 0; var ilength = 0;
                var strSep = '-';
                if (txtvalule.indexOf(strSep) == -1) {
                    strSep = '/';
                }
                var bflag = false;
                ipos = document.getElementById(txtid).selectionEnd;

                for (var index = 0; index < txtvalule.length; index++) {
                    if (index >= ipos) {

                        if (txtvalule.charAt(index).toString() == strSep) {
                            bflag = true;
                            ipos = index + 1;
                            break;
                        }
                    }
                }
                if (bflag == true) {
                    var val = txtvalule.length - ipos;
                    var strsubstring = txtvalule.substring(ipos, txtvalule.length);
                    if (strsubstring.indexOf(strSep) > -1) {
                        ilength = ipos + strsubstring.indexOf(strSep)
                    }
                    else {
                        ilength = txtvalule.length;
                    }
                }
                else {
                    ipos = 0;
                    ilength = txtvalule.indexOf(strSep);
                }
                document.getElementById(txtid).focus();
                document.getElementById(txtid).setSelectionRange(ipos, ilength);
                ev.preventDefault();
                ev.stopPropagation();
            }
            else {
                ev.preventDefault();
                ev.stopPropagation();
            }
        }
        else if (ev.which == 40) {
            if (datevalue != "") {
                var dteTemp = new Date(datevalue);
                if (dteTemp != 'Invalid Date') {
                    var ipos = 0; var ilength = 0; var iend = 0;
                    ipos = document.getElementById(txtid).selectionStart;
                    iend = document.getElementById(txtid).selectionEnd;
                    if (iend - ipos >= 0) {
                        var txtval = document.getElementById(txtid).value;
                        var strSep = '-';
                        if (txtval.indexOf(strSep) == -1) {
                            strSep = '/';
                        }
                        var strArray = datevalue.split(strSep);
                        var posEle = txtval.substring(ipos, iend);
                        var part = this.format.substring(ipos, iend).toUpperCase();
                        var parArray = this.format.split(strSep);
                        var returnval = "0";
                        var strDay = "", strMonth = "", strYear = "";
                        for (var index = 0; index < parArray.length; index++) {
                            switch (parArray[index].toUpperCase()) {
                                case "MM": strMonth = strArray[index];
                                    break;
                                case "YY": strYear = strArray[index];
                                    break;
                                case "YYYY": strYear = strArray[index];
                                    break;
                                case "MMM": strMonth = strArray[index];
                                    break;
                                case "DD": strDay = strArray[index];
                                    break;
                            }
                        }
                        switch (part) {
                            case "MM": returnval = custCal.MonthDecrement(posEle);
                                break;
                            case "YY": returnval = custCal.yearDecrement(posEle);
                                break;
                            case "YYYY": returnval = custCal.yearDecrement(posEle);
                                break;
                            case "MMM": returnval = custCal.MonthDecrement(posEle);
                                break;
                            case "DD": returnval = custCal.DayDecrement(posEle, strMonth, strYear);
                                break;
                        }

                        switch (part) {

                            case parArray[0].toUpperCase(): strArray[0] = returnval;
                                break;
                            case parArray[1].toUpperCase(): strArray[1] = returnval;
                                break;
                            case parArray[2].toUpperCase(): strArray[2] = returnval;
                                break;
                        }
                        document.getElementById(txtid).value = strArray[0] + strSep + strArray[1] + strSep + strArray[2];
                        var setDate = custCal.funGetCompatibleDate(document.getElementById(txtid).value);
                        var newDate = new Date(setDate);
                        custCal.funShowCalender(newDate);
                        document.getElementById(txtid).setSelectionRange(ipos, iend);
                        ev.preventDefault();
                        ev.stopPropagation();
                    }
                }
                else {
                    ev.preventDefault();
                    ev.stopPropagation();
                }
            }
        }

    }

    this.MonthInceremt = function(incrchar) {
        var incrementChar = incrchar.toString();
        var valIncchar = 0;
        if (incrementChar.length < 3) {
            var valIncchar = new Number(incrementChar)
        }
        else {
            var numberMonth = custCal.funGetMonthNumber(incrementChar);
            valIncchar = new Number(numberMonth);
        }
        if (valIncchar < 12) {
            document.getElementById("drpMonths").value = valIncchar;
            valIncchar = new Number(incrementChar) + 1;
            if (valIncchar.toString().length == 1) {
                valIncchar = "0" + valIncchar.toString();
            }
        }
        else {
            document.getElementById("drpMonths").value = parseInt(0);
            valIncchar = "01";

        }
        return valIncchar;
    }

    this.yearIncrement = function(incrchar) {
        var valIncchar = 0;
        valIncchar = new Number(incrchar) + 1;
        document.getElementById("drpYear").value = valIncchar;
        return valIncchar;
    }

    this.DayIncrement = function(incrchar, strMonth, strYear) {
        var returnDay = "";
        returnDay = incrchar;
        var month = new Number(strMonth) - 1;
        var dateToShow = new Date(strYear, month, 1);
        var intLastDate = custCal.funGetLastDate(dateToShow);
        var intFirstDayNo = custCal.funGetFirstDayNumber(dateToShow);
        //        var intLastday = intLastDate.getDay();
        if (intLastDate > new Number(incrchar)) {

            returnDay = new Number(incrchar) + 1;
            if (returnDay.toString().length == 1) {
                returnDay = "0" + returnDay
            }
        }
        else {
            returnDay = "01";
        }
        return returnDay;

    }


    this.MonthDecrement = function(incrchar) {
        var incrementChar = incrchar.toString();
        var valIncchar = 0;
        if (incrementChar.length < 3) {
            var valIncchar = new Number(incrementChar)
        }
        else {
            var numberMonth = custCal.funGetMonthNumber(incrementChar);
            valIncchar = new Number(numberMonth);
        }
        if (valIncchar > 1) {
            document.getElementById("drpMonths").value = new Number(valIncchar) - 2;
            valIncchar = new Number(incrementChar) - 1;
            if (valIncchar.toString().length == 1) {
                valIncchar = "0" + valIncchar.toString();
            }
        }
        else {
            document.getElementById("drpMonths").value = "11";
            valIncchar = "12";

        }
        return valIncchar;
    }

    this.yearDecrement = function(incrchar) {
        var valIncchar = 0;
        valIncchar = new Number(incrchar) - 1;
        document.getElementById("drpYear").value = valIncchar;
        return valIncchar;
    }
    this.DayDecrement = function(incrchar, strMonth, strYear) {
        var returnDay = "";
        returnDay = incrchar;
        var month = new Number(strMonth) - 1;
        var dateToShow = new Date(strYear, month, 1);
        var intLastDate = custCal.funGetLastDate(dateToShow);
        var intFirstDayNo = custCal.funGetFirstDayNumber(dateToShow);
        //        var intLastday = intLastDate.getDay();
        if (new Number(incrchar) > 1) {

            returnDay = new Number(incrchar) - 1;
            if (returnDay.toString().length == 1) {
                returnDay = "0" + returnDay
            }
        }
        else {
            returnDay = intLastDate.toString();
        }
        return returnDay;

    }



    this.createCalender = function() {
        var maintable = document.createElement('table');
        maintable.className = "maintable";
        maintable.tabindex = -1;
        for (var indexrow = 0; indexrow <= 3; indexrow++) {
            var objtr = document.createElement('tr');
            maintable.appendChild(objtr);
            var objcell = document.createElement('td');
            objtr.appendChild(objcell);
            if (indexrow == 0) {
                var objinnertable = document.createElement('table');
                objcell.appendChild(objinnertable);
                var objInnertr = document.createElement('tr');
                objinnertable.appendChild(objInnertr);
                for (var cellindex = 0; cellindex <= 4; cellindex++) {
                    var objinnercell = document.createElement('td');
                    objInnertr.appendChild(objinnercell);
                    if (cellindex == 0) {

                        var objsapn = document.createElement('a');
                        objsapn.innerHTML = "&nbsp;&nbsp;&lt;&nbsp;";
                        objsapn.setAttribute('onclick', 'custCal.funGoPrevMonth()');
                        //objsapn.tabindex = "-1";
                        //objsapn.Innerhtml = "style='cursor: hand;' onclick='funGoPrevMonth()'>&nbsp;&lt;&nbsp;&nbsp;";
                        objinnercell.appendChild(objsapn);
                    }
                    else if (cellindex == 1) {
                        var objSelectMonth = document.createElement("select");
                        objSelectMonth.id = "drpMonths";
                        objSelectMonth.onchange = function() {
                            custCal.funShowCalenderForMonthYear();
                        }
                        for (var intMonth = 0; intMonth <= 11; intMonth++) {
                            var option = document.createElement("option");
                            option.value = intMonth;
                            option.text = custCal.funGetMonthName(intMonth);

                            objSelectMonth.appendChild(option);
                        }
                        objinnercell.appendChild(objSelectMonth);
                        var tabindexmonth = document.createAttribute('tabindex');
                        tabindexmonth.nodeValue = -1;
                        objSelectMonth.setAttributeNode(tabindexmonth);
                    }
                    else if (cellindex == 2) {
                        var objSelect = document.createElement("select");
                        objSelect.id = "drpYear";
                        objSelect.tabindex = -1;
                        objSelect.onchange = function() {
                            custCal.funShowCalenderForMonthYear();
                        }
                        objinnercell.appendChild(objSelect);
                        var tabindexyear = document.createAttribute('tabindex');
                        tabindexyear.nodeValue = -1;
                        objSelect.setAttributeNode(tabindexyear);
                    }
                    else if (cellindex == 3) {
                        var objsapn = document.createElement('SPAN');
                        objinnercell.appendChild(objsapn);
                    }
                    else if (cellindex == 4) {
                        var objsapn = document.createElement('a');
                        objsapn.tabindex = "-1";
                        // objsapn.Innerhtml = " style='cursor: hand;' onclick='funGoNextMonth()'>&nbsp;&nbsp;&gt;&nbsp; ";
                        objsapn.setAttribute('onclick', 'custCal.funGoNextMonth()');
                        objsapn.innerHTML = "&nbsp;&nbsp;&gt;&nbsp;";
                        //objsapn.text = "&nbsp;&nbsp;&gt;&nbsp;";
                        objinnercell.appendChild(objsapn);
                    }
                }

            }
            else if (indexrow == 1) {
                var table = document.createElement('table');
                table.id = "tblCalender";
                table.className = "tblDate";
                objcell.appendChild(table);
                //            var objinnerTrbody = document.createElement('trbody');
                //            table.appendChild(objinnerTrbody);
                for (var intRowindex = 0; intRowindex <= 6; intRowindex++) {
                    var tr = document.createElement('tr');
                    table.appendChild(tr);
                    for (var iCellindex = 0; iCellindex <= 6; iCellindex++) {
                        var celltd = document.createElement('td');
                        tr.appendChild(celltd);
                        if (intRowindex == 0) {
                            var objsapn = document.createElement('SPAN');
                            celltd.appendChild(objsapn);
                            if (iCellindex == 0) {
                                objsapn.innerHTML = "Su";
                            }
                            else if (iCellindex == 1) {
                                objsapn.innerHTML = "Mo";
                            }
                            else if (iCellindex == 2) {
                                objsapn.innerHTML = "Tu";
                            }
                            else if (iCellindex == 3) {
                                objsapn.innerHTML = "We";
                            }
                            else if (iCellindex == 4) {
                                objsapn.innerHTML = "Th";
                            }
                            else if (iCellindex == 5) {
                                objsapn.innerHTML = "Fr";
                            }
                            else if (iCellindex == 6) {
                                objsapn.innerHTML = "Sa";
                            }
                        }

                    }
                }
            }
            else if (indexrow == 2) {
            }
        }

        return maintable;
    }

    this.funInitialize = function(objParams) {
        var arrParams = objParams.split("~");
        if (arrParams[2] == 'DD/MM/YYYY') {
            var Today = new Date();
            var strDate = Today.getDate() + "/" + eval(Today.getMonth() + 1) + "/" + Today.getFullYear();
            arrParams[2] = strDate;
        }
        var strDate = custCal.funGetCompatibleDate(arrParams[2]);
        //alert(strDate);
        //alert(strDate);
        dteCurrDate = new Date(strDate);
        // alert(dteCurrDate);
        intMinYear = new Number(arrParams[0]);
        intMaxYear = new Number(arrParams[1]);
        strReturnFormat = arrParams[3];
        custCal.funLoadYears(intMinYear, intMaxYear);
        //    document.getElementById("tblCalender").focus();
        document.getElementById("drpYear").value = dteCurrDate.getFullYear();
        document.getElementById("drpMonths").value = dteCurrDate.getMonth();
        custCal.funShowCalender(dteCurrDate);
    }

    this.funGetCompatibleDate = function(DateToFormat) {
        //    try {
        //alert(DateToFormat);
        var dteTemp = new Date(DateToFormat);
        // alert(dteTemp);
        if (dteTemp == DateToFormat) return DateToFormat;
        else if (dteTemp == 'Invalid Date') {
            var Today = new Date();
            // this.format
            return Today;

        }
        var returnDate = "";
        var strSep = "-";
        if (this.format.indexOf("/") > -1) strSep = "/";
        var spliArray = DateToFormat.split(strSep);
        var dd = "";
        var mm = "";
        //        dd = dteTemp.getDate();
        var yy = "";
        //        mm = dteTemp.getMonth();
        //        yy = dteTemp.getFullYear();
        //        if (parseInt(dd) < 9) {
        //            dd = "0" + dd;
        //        }
        //        if (parseInt(mm) < 9) {
        //            mm = "0" + mm;
        //        }
        switch (this.format.toUpperCase()) {
            case "DD/MM/YYYY":
                returnDate = spliArray[1] + "/" + spliArray[0] + "/" + spliArray[2];
                break;
            case "MM/DD/YYYY": returnDate = spliArray[0] + "/" + spliArray[1] + "/" + spliArray[2];
                break;
            case "YYYY/MM/DD": returnDate = spliArray[1] + "/" + spliArray[2] + "/" + spliArray[0];
                break;
            case "DD-MM-YYYY":
                returnDate = spliArray[1] + "/" + spliArray[0] + "/" + spliArray[2];
                break;
            case "MM-DD-YYYY": returnDate = spliArray[0] + "/" + spliArray[1] + "/" + spliArray[2];
                break;
            case "YYYY-MM-DD": returnDate = spliArray[1] + "/" + spliArray[2] + "/" + spliArray[0];
                break;
            case "DD-MMM-YYYY":
                var mm1 = "";
                mm1 = custCal.funGetMonthNumber(spliArray[1]).toString();
                returnDate = mm1 + "/" + spliArray[0] + "/" + spliArray[2];
                break;
            case "DD-MMM-YY":
                var mm2 = "", yy2 = "";
                if (parseInt(spliArray[2]) < 50) {
                    yy2 = "20" + spliArray[2];
                }
                else {
                    yy2 = "19" + spliArray[2];
                }
                mm2 = custCal.funGetMonthNumber(spliArray[1]).toString();
                returnDate = mm2 + "/" + spliArray[0] + "/" + yy2;
                break;
            case "DD-MM-YY":
                var yy3 = "";
                if (parseInt(spliArray[2]) < 50) {
                    yy3 = "20" + spliArray[2];
                }
                else {
                    yy3 = "19" + spliArray[2];
                }
                returnDate = spliArray[1] + "/" + spliArray[0] + "/" + yy3;

                break;
            case "MM-DD-YY":
                var yy4 = "";
                if (parseInt(spliArray[2]) < 50) {
                    yy4 = "20" + spliArray[2];
                }
                else {
                    yy4 = "19" + spliArray[2];
                }
                returnDate = spliArray[1] + "/" + spliArray[0] + "/" + yy4;
                break;
            default:
                returnDate = dteTemp;
        }
        return returnDate;
        //        var spliArray = this.format.split(strSep);
        //        var arrTemp = DateToFormat.split(strSep);

        //        var intFirstNo = new Number(arrTemp[0]);
        //        var intSecNo = funGetMonthNumber(arrTemp[1]);
        //        if (intFirstNo > 12)
        //            return intSecNo + "/" + intFirstNo + "/" + arrTemp[2];
        //        else if (intSecNo > 12)
        //            return intFirstNo + "/" + intSecNo + "/" + arrTemp[2];
        //        else
        //            return intSecNo + "/" + intFirstNo + "/" + arrTemp[2];


    }

    this.getPosition = function(obj) {
        var curleft = curtop = 0;
        do {
            curleft += obj.offsetLeft;
            curtop += obj.offsetTop;

        } while (obj = obj.offsetParent);
        return [curleft, curtop + 20];
    }

    this.funGetMonthNumber = function(Month) {
        if (Month == "Jan") return 1;
        else if (Month == "Feb") return 2;
        else if (Month == "Mar") return 3;
        else if (Month == "Apr") return 4;
        else if (Month == "May") return 5;
        else if (Month == "Jun") return 6;
        else if (Month == "Jul") return 7;
        else if (Month == "Aug") return 8;
        else if (Month == "Sep") return 9;
        else if (Month == "Oct") return 10;
        else if (Month == "Nov") return 11;
        else if (Month == "Dec") return 12;
        else return Month;
    }
    this.funLoadYears = function(fromYear, toYear) {
        for (var intCnt = fromYear; intCnt <= toYear; intCnt++) {
            var objOpt = document.createElement("OPTION");
            objOpt.text = intCnt;
            objOpt.value = intCnt;
            document.getElementById("drpYear").appendChild(objOpt);
        }
    }

    this.funShowCalender = function(dateToShow) {
        var objTblCal = document.getElementById("tblCalender");
        var intTodayDate = new Date().getDate();
        var intToDayMonth = new Date().getMonth();
        var intToDayYear = new Date().getFullYear();
        var intCurrDate = dateToShow.getDate();
        var intLastDate = custCal.funGetLastDate(dateToShow);
        var intFirstDayNo = custCal.funGetFirstDayNumber(dateToShow);
        var intTempFirstVal = intFirstDayNo;
        var intCounter = 1;
        var intLastColNo = 0;
        var intLastRowNo = 0;
        for (var intRowNo = 1; intRowNo <= 6; intRowNo++) {
            for (var intColNo = 0; intColNo < 7; intColNo++) {
                // remove previously added children, if any
                var objChild = objTblCal.childNodes[intRowNo].childNodes[intColNo].childNodes;
                for (var intTemp = 0; objChild != null && intTemp < objChild.length; intTemp++)
                    objTblCal.childNodes[intRowNo].childNodes[intColNo].removeChild(objChild[intTemp]);
                // add new child, only if applicable
                objTblCal.childNodes[intRowNo].childNodes[intColNo].className = "";
                if (intColNo >= intTempFirstVal && intCounter <= intLastDate) {
                    var objAnchor = document.createElement("SPAN");
                    objAnchor.innerHTML = "<a style='cursor: hand;' onclick=custCal.funSelectDate(" + intCounter + ")>" + intCounter + "</a>";
                    objTblCal.childNodes[intRowNo].childNodes[intColNo].appendChild(objAnchor);
                    if (intTodayDate == intCounter && intToDayMonth == dateToShow.getMonth() && intToDayYear == dateToShow.getFullYear())
                        objTblCal.childNodes[intRowNo].childNodes[intColNo].className = "CurrDate";
                    intCounter++;
                    intLastColNo = intColNo;
                    intLastRowNo = intRowNo;
                }
            }
            intTempFirstVal = 0;
        }
        // Now, show Previous Months dates also
        if (intFirstDayNo > 0 && intFirstDayNo < 7) {
            var intMonth = new Number(document.getElementById("drpMonths").value);
            var intYear = new Number(document.getElementById("drpYear").value);
            if (intMonth > 0)
                intMonth = intMonth - 1;
            else {
                intMonth = 11;
                if (intYear > intMinYear)
                    intYear = intYear - 1;
                else
                    intYear = intMaxYear;
            }
            var intLastDate = custCal.funGetLastDate(new Date(intYear, intMonth, 1));
            intCounter = intLastDate - (intFirstDayNo - 1);
            for (intColNo = 0; intColNo < intFirstDayNo; intColNo++) {
                var objAnchor = document.createElement("SPAN");
                objAnchor.innerHTML = "<a style='cursor: hand; color: gray;' onclick='custCal.funSelectDate(" + intCounter + ", -1)'>" + intCounter + "</a>";
                objTblCal.childNodes[1].childNodes[intColNo].appendChild(objAnchor);
                intCounter++;
            }
        }
        // Show Next Months dates also
        if (intLastColNo > 0 && intLastColNo <= 7 || intLastRowNo <= 6) {
            if (intLastColNo < 7) intColNo = intLastColNo + 1;
            else intColNo = 0;
            intCounter = 1;
            for (intRowNo = intLastRowNo; intRowNo <= 6; intRowNo++) {
                for (; intColNo < 7; intColNo++) {
                    var objAnchor = document.createElement("SPAN");
                    objAnchor.setAttribute('onclick', 'custCal.funSelectDate(' + intCounter + ',1)');
                    objAnchor.innerHTML = intCounter;
                    objAnchor.style.color = 'gray';
                    //objAnchor.innerHTML = "<a style='cursor: hand;' onclick=funSelectDate(" + intCounter + ")><font color='red'>" + intCounter + "</font></a>" ;
                    //objAnchor.innerHTML = "<a style='cursor: hand; color: gray;' onclick='funSelectDate(" + intCounter + ", 1)'>" + intCounter + "</a>";
                    objTblCal.childNodes[intRowNo].childNodes[intColNo].appendChild(objAnchor);
                    intCounter++;
                }
                intColNo = 0;
            }
        }
    }
    this.funSelectDate = function(clickedText, prevNext) {
        debugger;
        var intSelYear = new Number(document.getElementById("drpYear").value)
        var intSelMth = new Number(document.getElementById("drpMonths").value);
        if (prevNext == -1)	// previous month
        {
            if (intSelMth > 0)
                intSelMth -= 1;
            else {
                intSelMth = 11;
                if (intSelYear > intMinYear)
                    intSelYear -= 1;
                else
                    intSelYear = intMaxYear;
            }
        }
        else if (prevNext == 1) // next month
        {
            if (intSelMth < 11)
                intSelMth += 1;
            else {
                intSelMth = 0;
                if (intSelYear < intMaxYear)
                    intSelYear += 1;
                else
                    intSelYear = intMinYear;
            }
        }
        var dteSelected = new Date(intSelYear, intSelMth, clickedText);
        //var strTmpFmt = strReturnFormat.replace(/(\/)/g, '-');
        //var arrFormat = strTmpFmt.split("-");
        var strRetVal = "";
        var strSep = "-";
        if (strReturnFormat.indexOf("/") > -1) strSep = "/";
        var dd = "";
        var mm = "";
        dd = dteSelected.getDate();
        var yy = "";
        mm = dteSelected.getMonth();
        mm = mm + 1;
        yy = dteSelected.getFullYear();
        if (parseInt(dd) < 9) {
            dd = "0" + dd;
        }
        if (parseInt(mm) < 9) {
            mm = "0" + mm;
        }
        switch (this.format.toUpperCase()) {
            case "DD/MM/YYYY":
                strRetVal = dd + "/" + mm + "/" + yy;
                break;
            case "MM/DD/YYYY": dteSelected.getDate();
                strRetVal = mm + "/" + dd + "/" + yy;
                break;
            case "YYYY/MM/DD": returnDate = yy + "/" + mm + "/" + dd;
                break;
            case "DD-MM-YYYY": dteSelected.getDate();
                strRetVal = dd + "-" + dd + "-" + yy; ;
                break;
            case "MM-DD-YYYY": dteSelected.getDate();
                strRetVal = mm + "-" + dd + "-" + yy;
                break;
            case "YYYY-MM-DD": dteSelected.getDate();
                strRetVal = yy + "-" + mm + "-" + dd;
                break;
            case "DD-MMM-YYYY":
                var mm1 = "";
                mm1 = custCal.funGetMonth(parseInt(mm)).toString();
                strRetVal = dd + "-" + mm1 + "/" + yy;
                break;
            case "DD-MMM-YY": dteSelected.getDate();
                var mm2 = ""; var yy2 = "";
                mm2 = custCal.funGetMonth(parseInt(mm)).toString();
                yy2 = yy.sustrinb(2, 3);
                strRetVal = dd + "-" + mm2 + "-" + yy2;
                break;
            case "DD-MM-YY": dteSelected.getDate();
                var yy3 = "";
                yy3 = yy.sustrinb(2, 3);
                strRetVal = dd + "-" + mm + "-" + yy3;
                break;
            case "MM-DD-YY": dteSelected.getDate();
                var yy4 = "";
                yy4 = yy.sustrinb(2, 3);
                strRetVal = mm + "-" + dd + "-" + yy4;
                break;
            default:
                strRetVal = dteTemp;
        }

        document.getElementById(txtid).value = strRetVal;
        document.getElementById('dvCalendar').style.display = "none";

    }

    this.funGetLastDate = function(dateToGet) {
        var intCurrYear = dateToGet.getFullYear(), intCurrMth = dateToGet.getMonth();
        for (var i = 31; i >= 28; i--) {
            var dteNewTemp = new Date(intCurrYear, intCurrMth, i);
            if (intCurrMth == dteNewTemp.getMonth()) {
                return i;
            }
        }
    }

    this.funGetFirstDayNumber = function(dateToGet) {
        var intCurrYear = dateToGet.getFullYear(), intCurrMth = dateToGet.getMonth();
        var dteTmp = new Date(intCurrYear, intCurrMth, 1);
        return dteTmp.getDay();
    }

    this.funShowCalenderForMonthYear = function() {
        var intCurrDate = dteCurrDate.getDate();
        var intSelYear = document.getElementById("drpYear").value, intSelMth = document.getElementById("drpMonths").value;
        var dteNewDate = new Date(intSelYear, intSelMth, 1);
        var intLastDate = custCal.funGetLastDate(dteNewDate);
        if (intLastDate >= intCurrDate)
            dteNewDate = new Date(intSelYear, intSelMth, intCurrDate);
        else
            dteNewDate = new Date(intSelYear, intSelMth, intLastDate);
        custCal.funShowCalender(dteNewDate);
        //    var texbxid = document.getElementById('dvCalendar').getAttribute('textBoxid');
        document.getElementById(txtid).focus();
    }

    this.funGoPrevMonth = function() {
        var intTemp = new Number(document.getElementById("drpMonths").value);
        if (intTemp > 0)
            document.getElementById("drpMonths").value = intTemp - 1;
        else {
            document.getElementById("drpMonths").value = 11;
            intTemp = new Number(document.getElementById("drpYear").value);
            if (intTemp > intMinYear)
                document.getElementById("drpYear").value = intTemp - 1;
            else
                document.getElementById("drpYear").value = intMaxYear;
        }
        custCal.funShowCalenderForMonthYear();
    }

    this.funGoNextMonth = function() {
        var intTemp = new Number(document.getElementById("drpMonths").value);
        if (intTemp < 11)
            document.getElementById("drpMonths").value = intTemp + 1;
        else {
            document.getElementById("drpMonths").value = 0;
            intTemp = new Number(document.getElementById("drpYear").value);
            if (intTemp < intMaxYear)
                document.getElementById("drpYear").value = intTemp + 1;
            else
                document.getElementById("drpYear").value = intMinYear;
        }
        custCal.funShowCalenderForMonthYear();
    }

    this.funGetMonth = function(MonthNumber) {
        var arrMonths = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
        return arrMonths[MonthNumber - 1];
    }

    this.funGetMonthName = function(MonthNumber) {
        var arrMonths = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
        return arrMonths[MonthNumber];
    }

    this.funCloseCalender = function() {
        //window.returnValue = "close" ;
        //window.close() ;
        var intCurrDate = dteCurrDate.getDate();
        var intSelYear = document.getElementById("drpYear").value, intSelMth = document.getElementById("drpMonths").value;
        var dteNewDate = new Date(intSelYear, intSelMth, 1);
        var intLastDate = custCal.funGetLastDate(dteNewDate);
        if (intLastDate >= intCurrDate)
            dteNewDate = new Date(intSelYear, intSelMth, intCurrDate);
        else
            dteNewDate = new Date(intSelYear, intSelMth, intLastDate);
        custCal.funSelectDate(dteNewDate.getDate());
    }

    this.funClearDate = function() {
        window.returnValue = "clear";
        window.close();
    }
}
