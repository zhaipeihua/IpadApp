﻿window.onload = function() {
	new lineCanvas({
		el: document.getElementById("canvas"), //绘制canvas的父级div
		clearEl: document.getElementById("clearCanvas"), //清除按钮
		saveEl: document.getElementById("saveCanvas"), //保存按钮
		//      linewidth:1,//线条粗细，选填
		//      color:"black",//线条颜色，选填
		//      background:"#ffffff"//线条背景，选填
	});
};


function lineCanvas(obj) {

	this.linewidth = 2;
	this.color = "#000000";
	this.background = "#ffffff";
	for(var i in obj) {
		this[i] = obj[i];
	};
	this.canvas = document.createElement("canvas");
	this.el.appendChild(this.canvas);
	this.cxt = this.canvas.getContext("2d");
	this.canvas.width = this.el.clientWidth;
	this.canvas.height = this.el.clientHeight;
	this.cxt.fillStyle = this.background;
	this.cxt.fillRect(0, 0, this.canvas.width, this.canvas.height);
	this.cxt.strokeStyle = this.color;
	this.cxt.lineWidth = this.linewidth;
	this.cxt.lineCap = "round";
	//开始绘制
	this.canvas.addEventListener("touchstart", function(e) {
		this.cxt.beginPath();
		this.cxt.moveTo(e.changedTouches[0].pageX, e.changedTouches[0].pageY);
	}.bind(this), false);
	//绘制中
	this.canvas.addEventListener("touchmove", function(e) {
		this.cxt.lineTo(e.changedTouches[0].pageX, e.changedTouches[0].pageY);
		this.cxt.stroke();
	}.bind(this), false);
	//结束绘制
	this.canvas.addEventListener("touchend", function() {
		this.cxt.closePath();
	}.bind(this), false);
	//清除画布
	this.clearEl.addEventListener("click", function() {
		this.cxt.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.cxt.fillRect(0, 0, this.canvas.width, this.canvas.height);
	}.bind(this), false);
	//保存图片，直接转base64
	this.saveEl.addEventListener("click", function() {
		var imgBase64 = this.canvas.toDataURL();
		//document.getElementsByTagName("img")[0].setAttribute("src",imgBase64);
		sessionStorage.setItem("src", imgBase64);
		//				imgBase64 = imgBase64.replace(/^data:image\/(png|jpg);base64,/, "");
		window.location.href = "projectConfirmationDetails.html";
		console.log(imgBase64);

	}.bind(this), false);
};

$(".backIcon").click(function() {
	window.location.href = "projectConfirmationDetails.html";
});