define(["jquery", "getUrl", "template", "uploadify", "jcrop"], function($, obj, template){
	var cs_id = obj.getUrl().id;
	console.log(cs_id);
	var x = 0;
	var y = 0;
	var w = 0;
	var h = 0;
	$.ajax({
		url:"/api/course/picture",
		type:"get",
		data:{
			cs_id:cs_id
		},
		success:function(data){
			console.log(data);
			var html = template("step2-tpl",data.result);
			$(".steps").html(html);

			//初始化图片上传插件
			$("#uploadBtn").uploadify({
				swf: "/views/assets/uploadify/uploadify.swf",
				uploader:"/api/uploader/cover",
				buttonText:"选择图片",
				buttonClass:"btn btn-sm btn-success",
				width:70,
				itemTemplate: "<p></p>",
				fileObjName: "cs_cover_original",
				formData: {
					cs_id: cs_id
				},
				onUploadSuccess: function(file, data, response){
					data = JSON.parse(data);
					console.log(data);
					$(".preview>img").attr("src", data.result.path);
					$("#cropBtn").prop("disabled", false);					
				},
			})
			//修复插件样式的小问题
			$("#uploadBtn-button").css("line-height", "1.5")
		}
	});

	$(".steps").on("click","#cropBtn",function(){
		var text = $(this).text();
		console.log(text);
		if(text == "裁切图片"){
			$(".thumb>img").remove();
			$(".preview>img").Jcrop({
				boxWidth: 400,
				aspectRatio: 2,
				setSelect: [0, 0, 400, 200]
			},function(){
				var jcrop_api = this;
	  			thumbnail = this.initComponent('Thumbnailer', { width: 240, height: 120, thumbnail: ".thumb"});
			});

			$(".preview").on("cropmove", function(a, b, c){
				console.log(c)
				x = c.x;
				y = c.y;
				w = c.w;
				h = c.h;
			})
			$(this).text("保存图片");
		}
		
		else{
			// $(this).text("裁切图片");
			$(this).prop("disabled", true);
			$that = $(this);
			//向服务器发送请求保存当前裁切好的区域
			$.ajax({
				url: "/api/course/update/picture",
				type: "post",
				data: {
					cs_id: cs_id,
					x: x,
					y: y,
					w: w,
					h: h
				},
				success: function(data){
					if(data.code == 200){
						// $that.prop("disabled", false);
						location.href = "/course/step3?id=" + data.result.cs_id;
					}
				}
			})
		}
		
	})
})