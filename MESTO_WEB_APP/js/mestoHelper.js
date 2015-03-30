(function() {
    Date.prototype.toYMD = function() {
        var year, month, day;
        year = String(this.getFullYear());
        month = String(this.getMonth() + 1);
        if (month.length == 1) {
            month = "0" + month;
        }
        day = String(this.getDate());
        if (day.length == 1) {
            day = "0" + day;
        }
        return year + "-" + month + "-" + day;
    }
})();
(function() {
    Date.prototype.toDMY = function() {
        var year, month, day;
        year = String(this.getFullYear());
        month = String(this.getMonth() + 1);
        if (month.length == 1) {
            month = "0" + month;
        }
        day = String(this.getDate()+1); // XX: WTF +1
        if (day.length == 1) {
            day = "0" + day;
        }
        return day + "-" + month + "-" + year;
    }
})();