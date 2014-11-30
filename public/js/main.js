$(document).ready(function() {

	
  // ----------- Vue.js config -----------
  var dateData = [];
  var showData = [];

  Vue.filter('isTrue', function (value, text) {
    return value ? value : text
	});

  var displayShows = new Vue({
    el: '#showinfo',
    data: {
    	showData: showData,
    	init: true
    }
	});

  var displayDates = new Vue({
    el: '#dateData',
    data: {
    	dateData: dateData
    },
    methods: {
        onClick: function (e) {
          var url = e.target.getAttribute('title');
  				$.getJSON(url, function(data){
  					displayShows.showData = data.shows;
  					displayShows.init = false;
  				});
        }
    }
	});

	// ----------- bootstrap-datepicker locals -----------
  $.fn.datepicker.dates['zh-CN'] = {
		days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
		daysShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六", "周日"],
		daysMin:  ["日", "一", "二", "三", "四", "五", "六", "日"],
		months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
		monthsShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
		today: "今日",
		format: "yyyy年mm月dd日",
		weekStart: 1
	};

	// ----------- bootstrap-datepicker init -----------
	$('.leftnav .input-group.date').datepicker({
    format: "yyyy 年 m 月",
    startDate: "2014 年 1 月",
    endDate: "2014 年 12 月",
    startView: 1,
    minViewMode: 1,
    language: "zh-CN",
    autoclose: true
  }).on('changeDate', function(e){
  	var choosedDate = $('.leftnav .input-group.date').datepicker('getUTCDate');
  	var dates = getMDays(choosedDate);
  	var datesUrl = '/getDates?date='+ choosedDate.toJSON().split("T")[0].split("-").join('');
  	$.getJSON(datesUrl, function(data){
  		for(var i=0;i<dates.length;i++) {
  			dates[i].count = 0;
  			for(var j=0;j<data.dates.length;j++){
  				if(dates[i].date === data.dates[j].date) {
  					dates[i].count = data.dates[j].count;
  				} 
  			}
  			
  		}
  		displayDates.dateData = dates;
  	});
  });

  $(document).on('click', '#dateData .getshows', function(){
  	var url = $(this).attr('title');
  	var _this = $(this);
  	$('#dateData li span').addClass('disabled-fork');
  	$.getJSON(url, function(data){
  		_this.empty().html(data.count);
  		$('#dateData li span').removeClass('disabled-fork');
  		_this.addClass('disabled').siblings().removeClass('disabled');
  	});
  });

  // return an array of 'yyyymmdd' format days from giving Date object
  function getMDays ( d ) {
  	var dateArr = [];
  	var date = d.toJSON().split("T")[0].split("-");
  	var dateStr;
  	var days = new Date(d.getUTCFullYear(),d.getUTCMonth()+1,0).getDate();
  	for(var i=1;i<days+1;i++) {
  		var t = i;
  		if(i<10) {t = "0" + i;}
  		date[2] = t;
  		dateStr = date.join('');
  		dateArr.push({date: dateStr});
  	}
  	return dateArr;
  };

});
