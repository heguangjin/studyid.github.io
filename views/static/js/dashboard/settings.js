define(["jquery","ckeditor","region","nprogress","template","datepicker","datepicker-zh","region","uploadify","form"],function($,CKEDITOR,region,NProgress,template){
	console.log(9898);

	// $("#birthday").datepicker({
	// 	format:"yyyy-mm-dd",
	// 	language:"zh-CN"
	// })
	// $("input[name=join-date]").datepicker({
	// 	format:"yyyy-mm-dd",
	// 	language:"zh-CN"
	// })
	// // 富文本编辑器
	// CKEDITOR.replace("introduce", {
	// 	toolbarGroups: [
	//         { name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
	//         { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
	//         { name: 'paragraph',   groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ] },
	//         { name: 'styles' },
	//         { name: 'colors' },
	//         { name: 'about' }
 //    	]
	// });
	// // 省级联动
	// $("#region").region({
	// 	url: "/views/assets/jquery-region/region.json"
	// });


	// $("#upfile").uploadify({
	// 	swf: "/views/assets/uploadify/uploadify.swf",
	// 	uploader: "/api/uploader/avatar",
	// 	width: 120,
	// 	height: 120,
	// 	buttonText: "",
	// 	fileObjName: "tc_avatar",
	// 	itemTemplate: "<p></p>",
	// 	onUploadStart: function(){
	// 		NProgress.start();
	// 	},
	// 	onUploadSuccess: function(file, data){
	// 		data = JSON.parse(data);
	// 		if(data.code == 200){
	// 			//将服务器存储的图片地址，显示给头像图片框（预览）
	// 			$(".preview>img").attr("src", data.result.path)
	// 		}
	// 	},
	// 	onUploadComplete: function(){
	// 		NProgress.done();
	// 	}
	// })
	// 
	// 
	//向后台发送请求请求用户当前的个人信息
	//
	$.ajax({
		url:"/api/teacher/profile",
		type:"get",
		success:function(data){
			var html = template("setting-tpl",data.result);
			$(".settings").html(html);


			$("#birthday").datepicker({
				format:"yyyy-mm-dd",
				language:"zh-CN"
			})
			$("input[name=tc_join_date]").datepicker({
				format:"yyyy-mm-dd",
				language:"zh-CN"
			})
			// 富文本编辑器
			CKEDITOR.replace("introduce", {
				toolbarGroups: [
			        { name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
			        { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
			        { name: 'paragraph',   groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ] },
			        { name: 'styles' },
			        { name: 'colors' },
			        { name: 'about' }
				]
			});
			// 省级联动
			$("#region").region({
				url: "/views/assets/jquery-region/region.json"
			});

			$("#upfile").uploadify({
				swf: "/views/assets/uploadify/uploadify.swf",
				uploader: "/api/uploader/avatar",
				width: 120,
				height: 120,
				buttonText: "",
				fileObjName: "tc_avatar",
				itemTemplate: "<p></p>",
				onUploadStart: function(){
					NProgress.start();
				},
				onUploadSuccess: function(file, data){
					data = JSON.parse(data);
					if(data.code == 200){
						//将服务器存储的图片地址，显示给头像图片框（预览）
						$(".preview>img").attr("src", data.result.path)
					}
				},
				onUploadComplete: function(){
					NProgress.done();
				}
			})

		}
	})
	
	$(".settings").on("submit", "form", function(){
		$(this).ajaxSubmit({
			url: "/api/teacher/modify",
			type: "post",
			success: function(data){
				if(data.code == 200){
					alert("修改资料成功！");
				}
			}
		});

		return false;
	})
})