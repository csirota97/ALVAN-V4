Date.prototype.addDays = function(days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}

Date.prototype.addMonths = function(months) {
  var date = new Date(this.valueOf());
  date.setMonth(date.getMonth() + months);
  return date;
}