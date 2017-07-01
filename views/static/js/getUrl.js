define(function(){
	return {
		getUrl:function(){
			var str = location.search.slice(1);
			var strArr = str.split("&");
			var obj = {};
			for(var i =0;i<strArr.length;i++){
				var keyV = strArr[i].split("=");
				console.log(keyV);
				obj[keyV[0]] = decodeURI(keyV[1]);
			}
			return obj;
		}
	}
})