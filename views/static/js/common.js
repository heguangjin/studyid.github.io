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


    // 给侧边栏上的li添加事件,在点击的时候，让当前背景色变暗
    $(".navs>ul>li").click(function(){
    		$(this).children("a").addClass("active");
    		$(this).siblings().children("a").removeClass('active');
    })

    //让当前页面对应的导航栏菜单变暗
	$(".navs a").each(function(i, v) {
    	if($(v).attr("href") == location.pathname){
        	$(v).addClass('active');
        	// $(v).parent().parent().slideDown();
   	 	}
	});
})




	// NProgress.start();

	// NProgress.done();

	// $('.navs ul').prev('a').on('click', function () {
	// 	$(this).next().slideToggle();
	// });