define(["jquery", "template","nprogress","cookie"], function($,template,NProgress){

	NProgress.start();
	NProgress.done();

	$(document).ajaxStart(function(){
		NProgress.start();
	})

	$(document).ajaxStop(function(){
		NProgress.done();
	})

	// 侧边栏数据请求
	$(function(){
		//判断当前页是不是在登录页面，如果是就不做如下的操作
		if("/dashboard/login" != location.pathname){
			//完善登录功能，当用户处于未登录状态的时候，需要让用户直接跳转到登录页面
			//如果当前用户是出于登录状态cookie中就会有PHPSESSID这个属性否者就没有
			if(!$.cookie("PHPSESSID")){
				location.href = "/dashboard/login"
			}else{
				//从cookie中获取登录成功后存储的用户信息
		        var userInfo = JSON.parse($.cookie("userinfo"));
		        var html = template("profile-tpl", userInfo);

		        //将模板渲染到页面中刚才挖坑的地方
		        $("#userinfo").html(html);
			}

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
        	$(v).parent().parent().slideDown();
   	 	}
	});

	//导航栏二级菜单显示功能
	$(".navs>ul>li>ul").parent().click(function(){
		console.log(9898);
		$(this).children("ul").slideToggle();
		// 当ul下面的任何一个li被选中时，ul本身就移除active类
		if($(this).children("ul").find("a").hasClass('active')){
			$(this).children("ul").removeClass('active');
		}
	})
})
