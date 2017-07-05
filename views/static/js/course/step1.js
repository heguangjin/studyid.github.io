define(["jquery","template","ckeditor","getUrl","form"],function($,template,CKEDITOR,obj){
	var cs_id = obj.getUrl().id;
	console.log(cs_id);
	$.ajax({
		url:"/api/course/basic",
		type:"get",
		data:{
			cs_id:cs_id
		},
		success:function(data){
			console.log(data);
			if(data.code == 200){
				var html = template("coursestep1-tpl",data.result);
				$(".steps").html(html);
				// CKEDITOR.instances["brief"].updateElement()
				CKEDITOR.replace("brief");

			}
		}
	})

	$(".steps").on("submit", "form", function(){

		$(this).ajaxSubmit({
			url: "/api/course/update/basic",
			type: "post",
			success: function(data){
				if(data.code == 200){
					location.href = "/course/step2?id=" + data.result.cs_id;
				}
			}
		})

		return false;
	})
})