jQuery(document).ready(function($) {
	//初始化UA
	setUserAgent();
	var baseUrl = "https://www.qjrgj.com/crm";	
    //var baseUrl="http://192.168.22.240/crm"
	
	
	localStorage.setItem("baseUrl", baseUrl);

	//获取 登录Url 登录userId
	var loginUrl = baseUrl + "/V2_Basis/login.do";
	var userId = localStorage.getItem("aUserId");
	var password = localStorage.getItem("aPassword");

	if(userId == "null") {
		userId = "";
	}
	if(password == "null") {
		password = "";
	}
	$("#username").val(userId);
	$("#passerword").val(password);

	//忘记密码
	$(".forgive").click(function() {
		alert("功能未开放，请联系管理员");
	});
	//立即注册
	$('.nowLogin').click(function() {
		alert("功能未开放，请联系管理员");
	});
	//表单验证
	$('form :input').blur(function() {
		var $parent = $(this).parent();
		$parent.find(".formtips").remove();
		//验证用户名
		//判断is()
		if($(this).is('#username')) {
			if(this.value == "" || this.value != "" && !/^[a-zA-Z][a-zA-Z0-9_]{4,16}$/.test(this.value)) {
				var errorMsg = '用户名不能汉字';
				$parent.append('<span class="formtips onError">' + errorMsg + '</span>');
			} else {
				var okMsg = '';
				$parent.append('<span class="formtips onSuccess">' + okMsg + '</span>');
			}
		}
		//验证密码
		//判断is()
		if($(this).is('#passerword')) {
			if(this.value == "" || this.value != "" && !/^[0-9A-Za-z]{6,20}$/.test(this.value)) {
				var errorMsg = '请正确输入密码';
				$parent.append('<span class="formtips onError">' + errorMsg + '</span>');
			} else {
				var okMsg = '';
				$parent.append('<span class="formtips onSuccess">' + okMsg + '</span>');
			}
		}
	}).keyup(function() {
		// 触发处理器
		$(this).triggerHandler("blur");
	}).focus(function() {
		$(this).triggerHandler("blur");
	});
	//点击登录
	$('#send').click(function() {
		var userid = $('#username').val();
		var passerword = $('#passerword').val();
		if($.trim(userid) == "" || $.trim(passerword) == "") {
			alert("请填写用户名和密码");
			return;
		}
		data = {
			userid: userid,
			passwd: passerword
		};
		getUserid(data);
	});

	//登录函数
	function getUserid(data) {
		$.ajax({
			type: "post",
			url: loginUrl,
			dataType: "json",
			data: data,
			async: true,
			success: function(result) {
				console.log(result)
				//保存用户名和密码到原生系统的context中
//				var ua = localStorage.getItem("userAgent");
//				if(ua == "ios") {
//					window.webkit.messageHandlers.setUserIdAndPassword.postMessage(data); //ios
//					window.webkit.messageHandlers.setUserInfo.postMessage(result); //ios
//				} else if(ua == "android") {
//					window.H5MainActivity.initAfterLogin(data.userid, data.passwd, JSON.stringify(result)); //android
//				}
				localStorage.setItem("aUserId", data.userid); //ios
				localStorage.setItem("aPassword", data.passwd); //ios
				localStorage.setItem("newUserId", data.userid); //ios
				localStorage.setItem("userName", result.user_name) //ios
				localStorage.setItem("departmentName", result.department_name); //ios
				localStorage.setItem("headPhoto", result.url); //ios
				//去角色判断权限
				var arr = [];
				$.each(result.roles, function(i, n) {
					var self_json={};
					self_json.roleid=n.roleid;
                    self_json.role_name=n.role_name
                    arr.push(self_json)
				});
				var jsonObj = JSON.stringify(arr)
				localStorage.setItem("roleIdArr", jsonObj); //存角色权限判断
				localStorage.setItem("roleId", arr); //存角色权限判断
				localStorage.setItem("titIcon", result.url); //头像url
				//如果登录成功就跳转到功能菜单页
				if(result.userid!=="" && result.userid!==null && result.userid!==undefined) {
					window.location.href = "switchingUserRoles.html?backurl=" + window.location.href;
				}else{
					alert("您输入的用户名、密码有误或没权限，请重试");
				}
			},
			error: function(err) {
				alert("您输入的用户名、密码有误或没权限，请重试");
			}
		})
	}
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