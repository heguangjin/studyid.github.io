define(["jquery","template","bootstrap"],function($,template){
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
})