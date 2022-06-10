var today = new Date();
var year = today.getFullYear();

var month = today.getMonth() + 1;

var day = today.getDate();

var allday = 0;

function count() {
    if (month != 2) {
        if ((month == 4) || (month == 6) || (month == 9) || (month == 11)) {
            allday = 30;
        } else {
            allday = 31;
        }
        } else {
            if ((year % 400 === 0) || (year % 100 !== 0 && year % 4 === 0) ) {
                allday = 29;
            } else {
                allday = 28;
            }
        }
    }
    function showMonth() {
        var year_month = month + "/" + year ;
        document.getElementById("month").innerHTML = year_month;
    }
        function showDate() {
            showMonth();
            count();
            var firstdate = new Date(year, month - 1, 1);
            var month_1st = firstdate.getDay();
            var daterow = document.getElementById("day");
            daterow.innerHTML = "";
            if (month_1st != 0) {
                for (var i = 0; i < month_1st; i++) {
                    var dayElement = document.createElement("div");
                    dayElement.className = "everyday";
                    daterow.appendChild(dayElement);
                }
            }
             for (var j = 1; j <= allday; j++) {
        var dayElement = document.createElement("div");
        dayElement.className = "everyday";
        dayElement.innerHTML = j + "";
        if (j == day) {
            dayElement.style.color = "red";
        }

        daterow.appendChild(dayElement);
    }
}
function lastMonth() {
    if (month > 1) {
        month -= 1;

        } else {
        month = 12;
        year -= 1;
        }
    showDate();
}


function nextMonth() {
    if (month < 12) {
        month += 1;

    } else {
        month = 1;
        year += 1;
    }
	showDate();
}