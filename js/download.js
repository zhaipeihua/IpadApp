$(function() {
	//获取更新日期
	var newDate=new Date();
	var year=newDate.getFullYear(),
		month=Number(newDate.getMonth())+1,
		date=newDate.getDate();
	var newGetMonth=month >= 10 ? month : "0"+month;
	var newGetDate=date >= 10 ? date : "0"+date;
    var yearToDate=year+"/"+newGetMonth+"/"+newGetDate;
	$(".yearDate").html(yearToDate);

    //看大图
    mui.previewImage();

	//调用获取ua
	setUserAgent();
	var ua = localStorage.getItem("userAgent");

	$(".downBtn").click(function() {
		if(ua == "ios") {
			window.location.href = "itms-services:///?action=download-manifest&url=https://www.qjrgj.com/manifest.plist"
		} else {
            alert("对不起，您的设备暂时不支持！")
		}
	});

});
//设置当前h5的UA值
function setUserAgent() {
	var u = navigator.userAgent;
	//android终端
	if(u.indexOf('Android') > -1 || u.indexOf('Adr') > -1) {
		localStorage.setItem("userAgent", "android");
		//ios终端
	} else if(!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
		localStorage.setItem("userAgent", "ios");
	} else {
		localStorage.setItem("userAgent", "others");
	}
}