define(["jquery", "template", "cookie"], function($, template){
	// 侧边栏数据请求
	$(function(){
		//判断当前页是不是在登录页面，如果是就不做如下的操作
		if("/dashboard/login" != location.pathname){
			//从cookie中获取登录成功后存储的用户信息
	        var userInfo = JSON.parse($.cookie("userinfo"));
	        var html = template("profile-tpl", userInfo);

	        //将模板渲染到页面中刚才挖坑的地方
	        $("#userinfo").html(html);
		} 
    })

    // 头部退出按钮事件
    $("#out").click(function(){
	    $.ajax({
	        url:"/api/logout",
	        type:"post",
	        success:function(data){
	            console.log(data);
	            if(data.code == 200){
	               location.href ="/dashboard/login";
	            }               
	        }
	    })  
      })
})


	// NProgress.start();

	// NProgress.done();

	// $('.navs ul').prev('a').on('click', function () {
	// 	$(this).next().slideToggle();
	// });