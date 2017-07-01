define(["jquery","template","bootstrap"],function($,template){
	// 讲师数据列表取得
	$.ajax({
		url:"/api/teacher",
		type:"get",
		success:function(data){
			console.log(data);
			if(data.code == 200){
				var html = template("teacher_list_tpl", data);
				$("#teacherlist").html(html);
			}

		}
	})

	// 点击查看按钮，模态框展示与该教师相对应的信息
	
	//注册事件委托，实现点击查看按钮的事件
	$("#teacherlist").on("click",".btn-check",function(){
		console.log(232)
		console.log($(this).parent().data("id"));
		var tc_id = $(this).parent().data("id");
		$.ajax({
			url:"/api/teacher/view",
			type:"get",
		    data:{
		    	tc_id:tc_id
		    },
		    success:function(data){
		    	console.log(data);
		    	if(data.code == 200){
		    		// 模态框数据渲染
		    		var teachercheckHtml = template("teachercheck",data.result);
		    		$("#teacherModal").html(teachercheckHtml);	
		    	}

		    }
		})
	})

	// 给注销和启用按钮注册点击事件
	$("#teacherlist").on("click",".btnonoff",function(){
		var status = $(this).data("status");
		var tc_id = $(this).parent().data("id");
		var $that = $(this);
		$.ajax({
			url:"/api/teacher/handle",
			type:"post",
			data:{
				tc_id:tc_id,
				tc_status:status
			},
			success:function(data){
				if(data.code == 200){
					//每次请求下来之后，将服务器返回的用户的状态，更新到我们注销启用按钮上
					$that.data("status", data.result.tc_status);
					//如果后台正常返回数据，那么证明当前用户的状态已经被修改
					//那么页面上的操作按钮，也应该进行对应的变化
					//页面上的data-status属性的值没有发生变化但是后台数据库里的tc_status已经发生了变化只是没有展示到页面上而已
					if(data.result.tc_status == 0){
						$that.removeClass("btn-success");
						$that.addClass("btn-warning");
						$that.text("注销");
					}else{
						$that.removeClass("btn-warning");
						$that.addClass("btn-success");
						$that.text("启 用");
					}
				}

			}	
		})

	})
})