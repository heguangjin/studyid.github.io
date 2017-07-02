define(["jquery","template","getUrl","datepicker","form","datepicker","datepicker-zh"],function($,template,obj,datepicker){
	
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
		$("input[name=tc_join_date]").datepicker({
			format: 'yyyy-mm-dd',
			language: 'zh-CN'
		});
	}
	// $("input[name=tc_join_date]").datepicker({
	// 	format: 'yyyy-mm-dd',
	// 	language: 'zh-CN'
	// });
	// 给保存按钮添加事件
	$(".teacher").on("click","#btnSave",function(){
		console.log(4564);
		var type = $(this).data("type");
		console.log(type);
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
					location.href = "/teacher/list"
				}
			}
		});

		return false;
	})


})