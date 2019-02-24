function CustCal() {
    this.dteCurrDate = new Date();
    this.intMinYear = 0;
    this.intMaxYear = 0;
    this.strReturnFormat = "";
    var _popupMouseDown = false;
    var _TextBoxMouseDown = false;
    var DateFormat = {
        "dd/mm/yyyy": 1,
        "mm/dd//yyyy": 2,
        "dd-mmm-/yyyy": 3
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
}
CustCal.prototype = {
    var ForTextBox=document.getElementById(this.trgetControlID);
    DefaultDate
    ShowDatePicker :function() {
        if (ForTextBox == null) return;
        var retVal;
        txtid = ForTextBox.id;
        var currDate = ForTextBox.value;
        var intLeft = ForTextBox.offsetLeft;
        var intTop = ForTextBox.offsetTop + 140;
        if (intLeft > 520) intLeft = 520;
        if (DefaultDate == null || DefaultDate == "") DefaultDate = new Date();
        if (currDate == null || currDate == "") currDate = DefaultDate;
        if (FromYear == null || FromYear == "") FromYear = 1900;
        if (ToYear == null || ToYear == "") ToYear = 2099;
        if (ReturnFormat == null || ReturnFormat == "") ReturnFormat = "dd/mm/yyyy";
        //    retVal = window.showModalDialog("Miscellaneous/DatePicker.htm", FromYear + "~" + ToYear + "~" + currDate + "~" + ReturnFormat, strFeatures);
        if (!document.getElementById('dvCalendar')) {
            var maindiv = document.createElement('DIV');
            maindiv.id = "dvCalendar";
            maindiv.className = "DivCalender";
            var mainTable = this.createCalender();
            maindiv.appendChild(mainTable);
            document.body.appendChild(maindiv)
            document.getElementById('dvCalendar').style.display = "none";
        }
        if (document.getElementById('dvCalendar').style.display != "block") {
            document.getElementById('dvCalendar').style.display = "block";
            var params = FromYear + "~" + ToYear + "~" + currDate + "~" + ReturnFormat;
            document.getElementById('dvCalendar').style.left = ForTextBox.offsetLeft;
            document.getElementById('dvCalendar').style.top = ForTextBox.offsetTop + ForTextBox.width;
            document.getElementById('dvCalendar').style.position = "absolute";
            this.funInitialize(params);
        }
        ForTextBox.onmousedown =function() {
            this.openCalender();
        }
        ForTextBox.onmouseup =function() {
            this.ChangeBull();
        }
        document.getElementById('dvCalendar').onmousedown =function() {
            this.maindivMouseDown();
        }
        document.getElementById('dvCalendar').onmouseup =function() {
            this.maindivMouseUp();
        }
        document.onmousedown :function() {
            this.documentMouseDown();
        }
        ForTextBox.onblur :function() {
            this.closeclander();
        }
        ForTextBox.onkeydown :function(event) {
            this.TextboxkeyDown(event);
        }
    }
    this.documentMouseDown :function() {
        if (!_popupMouseDown && !_TextBoxMouseDown) {
            document.getElementById('dvCalendar').style.display = "none";
        }
    }
    this.mainTableMouseDown :function() {
        _popupMouseDown = true;
    }
    this.mainTableMouseUp :function() {
        _popupMouseDown = true;
    }
    this.openCalender :function() {
        _TextBoxMouseDown = true;
    }
    this.ChangeBull :function() {
        _TextBoxMouseDown = false;
    }
    this.maindivMouseDown :function() {
        _popupMouseDown = true;
    }
    this.maindivMouseUp :function() {
        _popupMouseDown = false;
    }
    this.closeclander :function() {
        if (!_popupMouseDown) {
            document.getElementById('dvCalendar').style.display = "none";
        }
    }

    this.TextboxkeyDown :function(ev) {
        var datevalue = document.getElementById(txtid).value;
        if (ev.which == 37) {
            if (datevalue != "") {
                var ipos = 0;
                ipos = oField.selectionStart;
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
                    if (txtval.lastIndexOf(strSep) == iend) {
                        var strMonth = txtval.substring(ipos, iend);
                        if (strMonth < 12) {
                            strMonth = parseInt(strMonth) + 1;
                        }
                        else {
                            strMonth = "1";
                        }

                    }

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
                var ipos = 0;
                ipos = document.getElementById(txtid).selectionStart;
            }
        }

    }

    this.createCalender :function() {
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
                        objsapn.setAttribute('onclick', 'funGoPrevMonth()');
                        //objsapn.tabindex = "-1";
                        //objsapn.Innerhtml = "style='cursor: hand;' onclick='funGoPrevMonth()'>&nbsp;&lt;&nbsp;&nbsp;";
                        objinnercell.appendChild(objsapn);
                    }
                    else if (cellindex == 1) {
                        var objSelectMonth = document.createElement("select");
                        objSelectMonth.id = "drpMonths";
                        objSelectMonth.onchange :function() {
                            this.funShowCalenderForMonthYear();
                        }
                        for (var intMonth = 0; intMonth <= 11; intMonth++) {
                            var option = document.createElement("option");
                            option.value = intMonth;
                            option.text = this.funGetMonthName(intMonth);

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
                        objSelect.onchange :function() {
                            this.funShowCalenderForMonthYear();
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
                        objsapn.setAttribute('onclick', 'funGoNextMonth()');
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

    this.funInitialize :function(objParams) {
        var arrParams = objParams.split("~");
        if (arrParams[2] == 'DD/MM/YYYY') {
            var Today = new Date();
            var strDate = Today.getDate() + "/" + eval(Today.getMonth() + 1) + "/" + Today.getFullYear();
            arrParams[2] = strDate;
        }
        var strDate = this.funGetCompatibleDate(arrParams[2]);
        //alert(strDate);
        //alert(strDate);
        dteCurrDate = new Date(strDate);
        // alert(dteCurrDate);
        intMinYear = new Number(arrParams[0]);
        intMaxYear = new Number(arrParams[1]);
        strReturnFormat = arrParams[3];
        this.funLoadYears(intMinYear, intMaxYear);
        //    document.getElementById("tblCalender").focus();
        document.getElementById("drpYear").value = dteCurrDate.getFullYear();
        document.getElementById("drpMonths").value = dteCurrDate.getMonth();
        this.funShowCalender(dteCurrDate);
    }

    this.funGetCompatibleDate :function(DateToFormat) {
        //    try {
        //alert(DateToFormat);
        var dteTemp = new Date(DateToFormat);
        // alert(dteTemp);
        if (dteTemp == DateToFormat) return DateToFormat;
        else if (dteTemp == 'Invalid Date') {
            var Today = new Date();
            return Today;

        }
        var strSep = "-";
        if (DateToFormat.indexOf("/") > -1) strSep = "/";
        var arrTemp = DateToFormat.split(strSep);
        var intFirstNo = new Number(arrTemp[0]);
        var intSecNo = funGetMonthNumber(arrTemp[1]);
        if (intFirstNo > 12)
            return intSecNo + "/" + intFirstNo + "/" + arrTemp[2];
        else if (intSecNo > 12)
            return intFirstNo + "/" + intSecNo + "/" + arrTemp[2];
        else
            return intSecNo + "/" + intFirstNo + "/" + arrTemp[2];
    }

    this.funGetMonthNumber :function(Month) {
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
    this.funLoadYears :function(fromYear, toYear) {
        for (var intCnt = fromYear; intCnt <= toYear; intCnt++) {
            var objOpt = document.createElement("OPTION");
            objOpt.text = intCnt;
            objOpt.value = intCnt;
            document.getElementById("drpYear").appendChild(objOpt);
        }
    }

    this.funShowCalender :function(dateToShow) {
        var objTblCal = document.getElementById("tblCalender");
        var intCurrDate = dateToShow.getDate();
        var intLastDate = this.funGetLastDate(dateToShow);
        var intFirstDayNo = this.funGetFirstDayNumber(dateToShow);
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
                    objAnchor.innerHTML = "<a style='cursor: hand;' onclick=this.funSelectDate(" + intCounter + ")>" + intCounter + "</a>";
                    objTblCal.childNodes[intRowNo].childNodes[intColNo].appendChild(objAnchor);
                    if (intCounter == intCurrDate)
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
            var intLastDate = funGetLastDate(new Date(intYear, intMonth, 1));
            intCounter = intLastDate - (intFirstDayNo - 1);
            for (intColNo = 0; intColNo < intFirstDayNo; intColNo++) {
                var objAnchor = document.createElement("SPAN");
                objAnchor.innerHTML = "<a style='cursor: hand; color: gray;' onclick='this.funSelectDate(" + intCounter + ", -1)'>" + intCounter + "</a>";
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
                    objAnchor.setAttribute('onclick', 'this.funSelectDate(' + intCounter + ',1)');
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
    this.funSelectDate :function(clickedText, prevNext) {
        var intSelYear = new Number(document.getElementById("drpYear").value), intSelMth = new Number(document.getElementById("drpMonths").value);
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
        var strTmpFmt = strReturnFormat.replace(/(\/)/g, '-');
        var arrFormat = strTmpFmt.split("-");
        var strRetVal = "";
        var strSep = "-";
        if (strReturnFormat.indexOf("/") > -1) strSep = "/";
        if (arrFormat[0] == "dd") {
            var iday = dteSelected.getDate();
            var strday = '';
            if (iday <= 9) {
                strday = '0' + iday;
            }
            else {
                strday = iday;
            }
            strRetVal = strday + strSep;
        }
        else if (arrFormat[0] == "mm")
            strRetVal = (dteSelected.getMonth() + 1) + strSep;

        if (arrFormat[1] == "dd") {
            var iday = dteSelected.getDate();
            var strday = '';
            if (iday <= 9) {
                strday = '0' + iday;
            }
            else {
                strday = iday;
            }
            strRetVal += strday + strSep;
        }
        else if (arrFormat[1] == "mm") {
            var iMonth = dteSelected.getMonth() + 1;
            var strMonth = '';
            if (iMonth <= 9) {
                strMonth = '0' + iMonth;
            }
            else {
                strMonth = iMonth;
            }
            strRetVal += (strMonth) + strSep;
        }
        else if (arrFormat[1] == "MMM")
            strRetVal += this.funGetMonth(dteSelected.getMonth() + 1) + strSep;

        strRetVal += dteSelected.getFullYear();
        //    var texbxid = document.getElementById('dvCalendar').getAttribute('textBoxid');

        //    if (document.getElementById(texbxid).value == '') {
        //        alert('entered');
        document.getElementById(txtid).value = strRetVal;
        //        return;
        //    }
        document.getElementById('dvCalendar').style.display = "none";

    }

    this.funGetLastDate :function(dateToGet) {
        var intCurrYear = dateToGet.getFullYear(), intCurrMth = dateToGet.getMonth();
        for (var i = 31; i >= 28; i--) {
            var dteNewTemp = new Date(intCurrYear, intCurrMth, i);
            if (intCurrMth == dteNewTemp.getMonth()) {
                return i;
            }
        }
    }

    this.funGetFirstDayNumber :function(dateToGet) {
        var intCurrYear = dateToGet.getFullYear(), intCurrMth = dateToGet.getMonth();
        var dteTmp = new Date(intCurrYear, intCurrMth, 1);
        return dteTmp.getDay();
    }

    this.funShowCalenderForMonthYear :function() {
        var intCurrDate = dteCurrDate.getDate();
        var intSelYear = document.getElementById("drpYear").value, intSelMth = document.getElementById("drpMonths").value;
        var dteNewDate = new Date(intSelYear, intSelMth, 1);
        var intLastDate = this.funGetLastDate(dteNewDate);
        if (intLastDate >= intCurrDate)
            dteNewDate = new Date(intSelYear, intSelMth, intCurrDate);
        else
            dteNewDate = new Date(intSelYear, intSelMth, intLastDate);
        this.funShowCalender(dteNewDate);
        //    var texbxid = document.getElementById('dvCalendar').getAttribute('textBoxid');
        document.getElementById(txtid).focus();
    }

    this.funGoPrevMonth :function() {
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
        this.funShowCalenderForMonthYear();
    }

    this.funGoNextMonth :function() {
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
        this.funShowCalenderForMonthYear();
    }

    this.funGetMonth :function(MonthNumber) {
        var arrMonths = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
        return arrMonths[MonthNumber - 1];
    }

    this.funGetMonthName :function(MonthNumber) {
        var arrMonths = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
        return arrMonths[MonthNumber];
    }

    this.funCloseCalender :function() {
        //window.returnValue = "close" ;
        //window.close() ;
        var intCurrDate = dteCurrDate.getDate();
        var intSelYear = document.getElementById("drpYear").value, intSelMth = document.getElementById("drpMonths").value;
        var dteNewDate = new Date(intSelYear, intSelMth, 1);
        var intLastDate = this.funGetLastDate(dteNewDate);
        if (intLastDate >= intCurrDate)
            dteNewDate = new Date(intSelYear, intSelMth, intCurrDate);
        else
            dteNewDate = new Date(intSelYear, intSelMth, intLastDate);
        this.funSelectDate(dteNewDate.getDate());
    }

    this.funClearDate :function() {
        window.returnValue = "clear";
        window.close();
    }
}  
    
