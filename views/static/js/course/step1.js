define(["jquery","template","ckeditor","getUrl"],function($,template,CKEDITOR,obj){
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
				CKEDITOR.replace("textarea");

			}
		}
	})
})