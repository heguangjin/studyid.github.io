define(["jquery","template","getUrl","jquery-validate","form","datepicker","datepicker-zh","datepicker"],function($,template,obj){
	
	var id = obj.getUrl().id;
	if(id){
		console.log(id);
		$.ajax({
			url:"/api/teacher/edit",
			type:"get",
			data:{
				tc_id:id
			},
			success:function(data){
				console.log(data);
				if(data.code == 200){
					data.result.title = "讲师编辑";
					data.result.text = "保存";
					data.result.type = "edit";
					var html = template("teacher-tpl",data.result);
					$(".teacher").html(html);
					// 给文本添加日期插件 datepicker
					$("input[name=tc_join_date]").datepicker({
						format: 'yyyy-mm-dd',
						language: 'zh-CN'
					});
				}


			}
		})
	}
	//如果获取不到id参数，则为添加
	else{
			var html = template("teacher-tpl", {
			title: "讲师添加",
			text: "添加",
			type: "add"
		});
		$(".teacher").html(html);
		// 给文本添加日期插件 datepicker
		$("input[name=tc_join_date]").datepicker({
			format: 'yyyy-mm-dd',
			language: 'zh-CN'
		});
	}

	var type = $("#btnSave").data("type");
	console.log($("#btnSave"));
	console.log(type);
	// 给保存按钮添加事件
	// $(".teacher").on("click","#btnSave",function(){
	// 	console.log(4564);
	// 	var type = $(this).data("type");
	// 	console.log(type);
	// 	var url = "";
	// 	if(type == "edit"){
	// 		url = "/api/teacher/update";
	// 	}else{
	// 		url = "/api/teacher/add";
	// 	}
	// 	//使用jquery.form插件将表单进行异步提交
	// 	$("#teacherform").ajaxSubmit({
	// 		url: url,
	// 		type: "post",
	// 		success: function(data){
	// 			if(data.code == 200){
	// 				// location.href = "/teacher/list"
	// 			}
	// 		}
	// 	});

	// 	return false;
	// })


	$("#teacherform").validate({
		// sendForm用来设置，表单验证通过之后，是否自动提交表单。默认是true。
		sendForm: false,
		// onBlur设置失去焦点的时候，是否要进行验证   默认值false
		onBlur: true,
		// onKeyup设置按键的时候，是否要进行验证   默认值false
		onKeyup: true,
		description: {
			"tcname": {
				required: "请输入用户名",
			},
			"tc_pass":{
				required:"请输入密码",
			},
			"tc_join_dat":{
				required:"请输入入职日期",
			}
		},
		// 当任意表单元素不通过校验的时候，就会调用该方法
		eachInvalidField: function(){
			this.parent().parent().addClass("has-error").removeClass("has-success");
			this.parent().next().removeClass("hide");
		},
		// 当任意表单元素通过校验的时候，就会调用该方法
		eachValidField: function(){
			this.parent().parent().addClass("has-success").removeClass("has-error");
		},
		//当整个表单通过验证的时候，会调用该回调方法,再去发送请求把数据更新掉
		valid: function(){
			console.log("验证通过了");
			var type = $("#btnSave").data("type");
			console.log(type1);
			var url = "";
			if(type == "edit"){
				url = "/api/teacher/update";
			}else{
				url = "/api/teacher/add";
			}
			//使用jquery.form插件将表单进行异步提交
			$("#teacherform").ajaxSubmit({
				url: url,
				type: "post",
				success: function(data){
					if(data.code == 200){
						location.href = "/teacher/list";
					}
				}
			});
		},

		invalid: function(){
			console.log("验证不通过");
		}

	})

})