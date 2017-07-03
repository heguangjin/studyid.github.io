define(["jquery","template"],function($,template){
	console.log(888);
	$.ajax({
		url:"/api/course",
		type:"get",
		success:function(data){
			console.log(data);
			if(data.code == 200){
				var html = template("course-tpl",data);
				$(".courses").html(html);
			}
		}
	})
})	