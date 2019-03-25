/**
 * Created by Administrator on 2018/7/16.
 */
$(function () {
    var newRoleId = localStorage.getItem("roleIdArr");//字符串json数据格式
    var json_to_arr = eval(newRoleId)//转换成可解析数据格式
    var new_li = "";
    if(json_to_arr.length==1){
        var setRole=json_to_arr[0].roleid;
        var setNameRole=json_to_arr[0].role_name;
        localStorage.setItem('roleid',setRole);
        localStorage.setItem("role_name",setNameRole);
        window.location.href="projectConfirmationList.html"
    }else if(json_to_arr!==""&&json_to_arr!==null&&json_to_arr!==undefined&&json_to_arr.length>0){
        $.each(json_to_arr, function (i, n) {
            new_li += '<li><a setVal=' + n.roleid + '>' + n.role_name + '</a><input type="hidden" value='+n.role_name+'></li>'
        })
    $('.userBtn').append(new_li);
    //点击跳转菜单页
    $('.userBtn li a').click(function () {
        var index=$(this).index();
        var getRole=$(this).eq(index).attr("setVal");
        var currentRoleName=$(this).eq(index).next("input").val();
        localStorage.setItem('roleid',getRole);
        localStorage.setItem("role_name",currentRoleName)
        window.location.href="projectConfirmationList.html"
    })
    }else if(json_to_arr.length==0||json_to_arr==""||json_to_arr==null||json_to_arr==undefined) {
        localStorage.setItem('roleid',"CON");
        localStorage.setItem("role_name","通用角色");
        window.location.href="projectConfirmationList.html"
    }
   
    //退出登录
    $('.cancel').click(function () {
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
        window.location.href="login.html";
    })
})