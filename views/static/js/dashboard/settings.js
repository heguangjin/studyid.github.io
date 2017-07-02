define(["jquery","ckeditor","region","datepicker","datepicker-zh","region"],function($,CKEDITOR,region){
	console.log(9898);

	$("#birthday").datepicker({
		format:"yyyy-mm-dd",
		language:"zh-CN"
	})
	$("input[name=join-date]").datepicker({
		format:"yyyy-mm-dd",
		language:"zh-CN"
	})

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

	$("#region").region({
		url: "/views/assets/jquery-region/region.json"
	})

})