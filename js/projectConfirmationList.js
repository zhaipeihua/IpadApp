mui.init({
	pullRefresh: {
		container: '#pullrefresh',
		down: {
			callback: pulldownRefresh
		},
		up: {
			contentrefresh: '正在加载...',
			callback: pullupRefresh
		}
	}
});
var baseUrl = localStorage.getItem("baseUrl");
var ua = localStorage.getItem("userAgent");
var roleid=localStorage.getItem('roleid');
var roileName=localStorage.getItem('role_name')
$('.role_name').html(roileName)
//接口
var allUrl = baseUrl + "/v2_order/selectOrderConfirmList.do";
var userId = localStorage.getItem("newUserId");
var count = 1; //传给后台的页数
/**
 * 下拉刷新具体业务实现
 */
function pulldownRefresh() {
	var searchCont = ""; //获取搜索框里面的内容
	$(".startTimeBtn").text("开始时间"); //开始时间
	$(".endTimeBtn").text("结束时间"); //结束时间
	setTimeout(function() {
		var startTime = $(".startTimeBtn").text(); //获取开始时间
		var endTime = $(".endTimeBtn").text(); //获取结束时间
		if(startTime == "开始时间") {
			startTime = null
		}
		if(endTime == "结束时间") {
			endTime = null
		}
        $.ajax({
			url: allUrl,
			type: "POST",
			dataType: "json",
			data: {
				start_time: startTime,
				end_time: endTime,
				cust_name: searchCont,
				roleid:roleid,
				userid: userId,
				pageNow: page
			},
			success: function(data) {
				$(".oUl").html(""); //清空列表
				succeed(data)
			}
		}) 
		mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); //refresh completed
	}, 1500);
}

/**
 * 上拉加载具体业务实现
 */

function pullupRefresh() {
	var searchCont = $('.search').val(); //获取搜索框里面的内容
	var startTime = $(".startTimeBtn").text(); //获取开始时间
	var endTime = $(".endTimeBtn").text(); //获取结束时间
	if(startTime == "开始时间") {
		startTime = null
	}
	if(endTime == "结束时间") {
		endTime = null
	}

	if($(".mui-pull-caption").text() == "没有更多数据了") {

	}
	setTimeout(function() {
		$.ajax({
			type: "post",
			url: allUrl,
			async: true,
			data: {
				pageNow: count,
				userid: userId,
				cust_name: searchCont,
				start_time: startTime,
				end_time: endTime,
				roleid:roleid
			},
			success: restyMsg,
			error: function() {

			}
		});

		function restyMsg(msg) {

			if(msg == "ERROR" || msg == "" || msg == null || msg == undefined) {
				mui('#pullrefresh').pullRefresh().endPullupToRefresh((true)); //参数为true代表没有更多数据了。
				$(".mui-pull-caption").html("数据加载异常！");
			} else {
				var myMsg = eval('(' + msg + ')');
				console.log(myMsg)
				if(myMsg.length == 0) {
					mui('#pullrefresh').pullRefresh().endPullupToRefresh((true)); //参数为true代表没有更多数据了。
				} else {
					mui('#pullrefresh').pullRefresh().endPullupToRefresh((count++ == false)); //参数为false代表还有数据。
					var table = document.body.querySelector('.oUl');
					var cells = document.body.querySelectorAll('.mui-table-view-cell');
					for(var i = 0; i < myMsg.length; i++) {
						var li = document.createElement('li');
						li.className = 'personalInfo';
						li.innerHTML = '<p class="infoLeft">' +
							'<span>订单号:</span>' +
							'<small class="orderId">' + myMsg[i].orderid + '</small>' +
							'<input type="hidden" class="hideId" value="' + myMsg[i].id + '" />' +
							'</p>' +
							'<p class="infoRight" style="text-indent: 0;">' +
							'<span>姓名:</span>' +
							'<small style="text-overflow:ellipsis;overflow:hidden;">' + myMsg[i].cust_name + '</small>' +
							'</p>';
						table.appendChild(li);
					}
				}
			}
		}

	}, 500);

}
if(mui.os.plus) {
	mui.plusReady(function() {
		setTimeout(function() {
			mui('#pullrefresh').pullRefresh().pullupLoading();
		}, 500);
	});
} else {
	mui.ready(function() {
		mui('#pullrefresh').pullRefresh().pullupLoading();
	});
};

//开始和结束时间控件
(function($) {
	$.init();
	var startTime = $('#startTime')[0];
	var endTime = $('#endTime')[0];
	var startBtn = $('.startTimeBtn');
	var endBtn = $(".endTimeBtn");
	startBtn.each(function(i, btn) { //开始时间
		btn.addEventListener('tap', function() {
			var optionsJson = this.getAttribute('data-options') || '{}';
			var options = JSON.parse(optionsJson);
			var id = this.getAttribute('id');
			//var picker = new $.DtPicker(options);
			var picker = new mui.DtPicker();
			picker.show(function(rs) {
				var r = rs.text;
				startTime.innerHTML = r;
				picker.dispose();
				startquery(r);
			});
		}, false);
	});
	endBtn.each(function(i, btn) { //结束时间
		btn.addEventListener('tap', function() {
			var optionsJson = this.getAttribute('data-options') || '{}';
			var options = JSON.parse(optionsJson);
			var id = this.getAttribute('id');
			// var picker = new $.DtPicker(options);
			var picker = new mui.DtPicker();
			picker.show(function(rs) {
				var r = rs.text;
				endTime.innerHTML = r;
				picker.dispose();
				endquery(r);
			});
		}, false);
	});
})(mui);

var page = 1;
//开始时间筛选
function startquery(startTime) {
	$(".oUl").html("") //清空列表
	var userName = $(".search").val(); //搜索val里面的内容
	$.ajax({
		url: allUrl,
		type: "POST",
		dataType: "json",
		data: {
			start_time: startTime,
			cust_name: userName,
			userid: userId,
			pageNow: page

		},
		success: function(data) {

			succeed(data);

		}
	});
}

//结束时间筛选 
function endquery(endTime) {
	$(".oUl").html("") //清空列表
	var userName = $(".search").val(); //搜索val里面的内容
	if($("#startTime").html() !== "开始时间") {
		var startTime = $("#startTime").html(); //开始的时间
	} else {
		var startTime = "";
	}
	$.ajax({
		url: allUrl,
		type: "POST",
		dataType: "json",
		data: {
			start_time: startTime,
			end_time: endTime,
			cust_name: userName,
			userid: userId,
			roleid:roleid,
			pageNow: page
		},
		success: function(data) {
			succeed(data);
		}
	});
}

//搜索
document.getElementsByClassName('search')[0].addEventListener('input', function() { //原生js兼容ios写法 
	setTimeout(function() {
		var searchCont = $('.search').val();
		var startTime = $(".startTimeBtn").text(); //获取开始时间
		var endTime = $(".endTimeBtn").text(); //获取结束时间
		if(startTime == "开始时间") {
			startTime = null
		}
		if(endTime == "结束时间") {
			endTime = null
		}
		$.ajax({
			url: allUrl,
			type: "POST",
			dataType: "json",
			data: {
				start_time: startTime,
				end_time: endTime,
				cust_name: searchCont,
				userid: userId,
				roleid:roleid,
				pageNow: page
			},
			success: function(data) {
				$(".oUl").html(""); //清空列表
				succeed(data)
			}
		})
	}, 500);

});

//ajax成功函数
function succeed(dataSet) {
	$('.mui-scroll').attr("style", "transform:translate3d(0px, 0px, 0px) translateZ(0px)");
	mui('#pullrefresh').pullRefresh().refresh(true);
	var myData = eval(dataSet);
	for(var i = 0; i < myData.length; i++) {
		$(".oUl").append('<li class="personalInfo">' +
			'<p class="infoLeft">' +
			'<span>订单号:</span>' +
			'<small class="orderId">' + myData[i].orderid + '</small>' +
			'<input type="hidden" class="hideId" value="' + myData[i].id + '" />' +
			'</p>' +
			'<p class="infoRight" style="text-indent: 0;">' +
			'<span>姓名:</span>' +
			'<small style="text-overflow:ellipsis;overflow:hidden;">' + myData[i].cust_name + '</small>' +
			'</p></li>');
	};
}

//点击跳入详情
mui(".oUl").on("tap", ".personalInfo", function() {
	var i = $(this).index();
	var myId = $(".hideId").eq(i).val();
	localStorage.setItem("id", myId);
	window.location.href = "projectConfirmationDetails.html";
});

$(function() {
	var titIcon = localStorage.getItem("titIcon");
	var userName = localStorage.getItem("userName");
	$(".iconTit").css({
		"background-image": "url(" + titIcon + ")"
	});
	$(".icon").css({
		"background-image": "url(" + titIcon + ")"
	});
	$(".ceTitle").html(userName);

	//退出登录
	$(".exitBtn").click(function() {
        localStorage.removeItem("baseUrl");
        localStorage.removeItem("newUserId");
        localStorage.removeItem("aUserId");
        localStorage.removeItem("aPassword");
        localStorage.removeItem("role_name")
        localStorage.removeItem("roleId");
        localStorage.removeItem("roleIdArr")
        localStorage.removeItem("userid")
        localStorage.removeItem("userName")
        localStorage.removeItem("shopId")
        localStorage.removeItem("self_index")
        localStorage.removeItem("orderId")
        localStorage.removeItem("orderid")
        localStorage.removeItem("operation")
        localStorage.removeItem("newRoleId")
        localStorage.removeItem("id")
        localStorage.removeItem("height")
        localStorage.removeItem("headPhoto")
        localStorage.removeItem("flag")
        localStorage.removeItem("department_different")
        localStorage.removeItem("departmentName")
        localStorage.removeItem("customerName")
        localStorage.removeItem("copyHeight")
        localStorage.removeItem("change_index")
        localStorage.removeItem("allShopId")
        localStorage.removeItem("allId")
		window.location.href = "login.html";
	});

    var newRoleId = localStorage.getItem("roleIdArr");//字符串json数据格式
    var json_to_arr = eval(newRoleId)//转换成可解析数据格式
    if(json_to_arr.length==1){
        $(".exitBtn1").css({"pointer-events":"none","opacity":"0.3"});//一个角色隐藏角色切换
    }else if(json_to_arr.length==0||json_to_arr==""||json_to_arr==null||json_to_arr==undefined){
        $(".exitBtn1").css({"pointer-events":"none","opacity":"0.3"});//通用角色隐藏角色切换
    }else{
        $(".exitBtn1").css({"pointer-events":"auto","opacity":"1"});//角色切换
		//角色切换
	    $('.exitBtn1').click(function(){
	    	window.location.href="switchingUserRoles.html";
	    })
    }
})