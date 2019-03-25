//var baseUrl="http://192.168.22.126:8080/amp"
var baseUrl = localStorage.getItem("baseUrl");
var ua = localStorage.getItem("userAgent");
var imgSrc = sessionStorage.getItem("src");
//角色判定

$(function() {
    var roleid=localStorage.getItem('roleid');
	var id = localStorage.getItem("id");
	var url = baseUrl + "/v2_order/selectOrderConfirmDetail.do";
	$.ajax({
		type: "post",
		url: url,
		async: true,
		data: {
			id: id,
			roleid:roleid,
		},
		success: function(msg) {
			var myMsg = eval('(' + msg + ')');
			//角色判定，客户打印按钮的显示隐藏
			if(roleid == "FIN" && myMsg.cust_assign == "") {
				$(".signature").show();
				$(".btnBox").show();
			} else if(roleid == "DES" && myMsg.cust_assign == ""){
				$(".signature").show();
				$(".btnBox").show();
			}
			console.log(myMsg)
			$("#homepage").attr("projectId", myMsg.id); //項目id
			$('.date').html(myMsg.insert_time); //日期
			$('.custName').html(myMsg.cust_name); //客户姓名
			$('.transactionPrice').html(myMsg.amount); //成交价
			$('.actualDelivery').html(myMsg.fact_pay); //项目实际支付
			$('.cashPayment').html(myMsg.cash_pay); //现金支付
			$('.posPayment').html(myMsg.pos_pay); //pos机支付
			$('.counselor').html(myMsg.consultant_name); //市场咨询师
			$('.stylist').html(myMsg.designer_name); //设计师
			$(".remark").val(myMsg.remarks); //设计师备注
			$('.payment').html(myMsg.accountantName); //财务
			$('.belongShop').html(myMsg.shop_name); //店铺
			$('.self_money').html(myMsg.subscription) //订金
			$('.store').html(myMsg.shop_recPay) //店铺代收
			$(".help_designer").html(myMsg.designerAssistant_name) //设计师助理
			$('.pepole_cervice').html(myMsg.beforeCustomerServiceStaff_name) //客服
			$(".person_store").html(myMsg.principal) //店铺负责人
			$(".subscription").html(myMsg.beforeEarnest); //以往订金转入

			var payableProjects = myMsg.v2PayProject; //项目
			$.each(payableProjects, function(i, n) {
				name = n.project_name
				var remark = n.remark == "" || n.remark == undefined || n.remark == null ? "" : n.remark;
				if(n.remark == "" || n.remark == undefined || n.remark == null) {
					$(".newAddProjects").append('<div class="line_box" style="padding:.1rem .2rem">' +
						'<div class="flex-item little" projects_id=' + n.project_id + '>' +
						'<div style="width: 100%;display: flex;justify-content: space-between;">' +
						'<div class="color_name" style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">' + name + '</div>' +
						'<div class="projectNum" style="width：16%;line-height:0.5rem;">X' + n.number + '</div>' +
						'</div>' +
						'<div class="set_mon"><a class="red">' + '&yen;' + '</a>' +
						'<span class="buy">' + n.original_price + '</span></div>' +
						'</div>' +
						'<textarea class="editbox"  placeholder="输入备注" readonly="readonly" unselectable="on" onfocus="this.blur()" style="display: none">' + remark + '</textarea>' +
						'</div>')
				} else {
					$(".newAddProjects").append('<div class="line_box" style="padding:.1rem .2rem">' +
						'<div class="flex-item little" projects_id=' + n.project_id + '>' +
						'<div style="width: 100%;display: flex;justify-content: space-between;">' +
						'<div class="color_name" style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">' + name + '</div>' +
						'<div class="projectNum" style="width：16%;line-height:0.5rem;">X' + n.number + '</div>' +
						'</div>' +
						'<div class="set_mon"><a class="red">' + '&yen;' + '</a>' +
						'<span class="buy">' + n.original_price + '</span></div>' +
						'</div>' +
						'<textarea class="editbox"  placeholder="输入备注" readonly="readonly" unselectable="on" onfocus="this.blur()">' + remark + '</textarea>' +
						'</div>')
				}
			});
			var giveProjects = myMsg.v2GiveProject; //赠送项目
			$.each(giveProjects, function(i, n) {
				name = n.project_name
				var remark = n.remark == "" || n.remark == undefined || n.remark == null ? "" : n.remark;
				if(n.remark == "" || n.remark == undefined || n.remark == null) {
					$(".nPayMoney").append('<div class="line_box" style="padding:.2rem">' +
						'<div class="flex-item little2" projects_id=' + n.project_id + '>' +
						'<div style="width: 100%;display: flex;justify-content: space-between;">' +
						'<div class="color_name" style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">' + name + '</div>' +
						'<div class="projectNum" style="width：16%;line-height:0.5rem;">x' + n.number + '</div>' +
						'</div>' +
						'<div class="set_mon"><span style="color: #f00">&yen;</span>' + n.original_price + '</div>' +
						'</div>' +
						'<textarea class="editbox1" readonly="readonly" unselectable="on" onfocus="this.blur()" style="display: none">' + remark + '</textarea>' +
						'</div>')
				} else {
					$(".nPayMoney").append('<div class="line_box" style="padding:.2rem">' +
						'<div class="flex-item little2" projects_id=' + n.project_id + '>' +
						'<div style="width: 100%;display: flex;justify-content: space-between;">' +
						'<div class="color_name" style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">' + name + '</div>' +
						'<div class="projectNum" style="width：16%;line-height:0.5rem;">x' + n.number + '</div>' +
						'</div>' +
						'<div class="set_mon"><span style="color: #f00">&yen;</span>' + n.original_price + '</div>' +
						'</div>' +
						'<textarea class="editbox1" readonly="readonly" unselectable="on" onfocus="this.blur()">' + remark + '</textarea>' +
						'</div>')
				}
			});

			//签名完成回显
			imgSrc == null || imgSrc == "" || imgSrc == "null" ? $(".imgCustomer").attr("src", myMsg.url) : $(".imgCustomer").attr("src", imgSrc);
		}
	});

	//返回上一页
	$(".backIcon").click(function() {
		sessionStorage.removeItem("src");
		window.location.href = "projectConfirmationList.html";
	});
});

//客户签字
mui("header").on("tap", ".signature", function() {
	window.location.href = "projectCustomerSignature.html";
})

//提交
var submitUrl = baseUrl + "/v2_order/saveCustomerAssign.do";
function submit() {
	$(".popUp").show();
	$(".mark").show();
}
//确定提交
mui(".popUpBoxs").on("tap", ".notarize", function() {
	var id = $("#homepage").attr("projectId"); //項目id
	var userId = localStorage.getItem("newUserId"); //userId
	var data = {
		id: id,
		userid: userId,
		custAssignBase64: imgSrc
	}
	submitFun(data);
	$(".popUp").hide();
	$(".mark").hide();
});
//取消
mui(".popUpBoxs").on("tap", ".cancel", function() {
	$(".popUp").hide();
	$(".mark").hide();
});
//遮罩
mui("body").on("tap", ".mark", function() {
	$(".popUp").hide();
	$(".mark").hide();
});

function submitFun(data) {
	$.ajax({
		type: "post",
		url: submitUrl,
		async: true,
		data: data,
		beforeSend: function() {
			//返回失败之前设置按钮不可用
			$(".submitBtn").css({
				"pointer-events": "none",
				"opacity": "0.3"
			});
		},
		success: function(msg) {
			if(msg == "OK") {
				sessionStorage.removeItem("src");
				alert("提交成功");
				window.location.href = "projectConfirmationList.html";
			} else {
				alert("提交失败");
				$(".submitBtn").css({
					"pointer-events": "auto",
					"opacity": "1"
				});
			}
		},
		error: function(err) {
			alert("提交失败");
			$(".submitBtn").css({
				"pointer-events": "auto",
				"opacity": "1"
			});
		}
	});
}

/*图片预览*/
mui.previewImage();