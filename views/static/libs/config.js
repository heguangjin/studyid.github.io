require.config({
     baseUrl: "/views",
     paths: {
     	"jquery": "assets/jquery/jquery.min",
          // 表单ajax提交插件
     	"form": "assets/jquery-form/jquery.form",
          // cookie插件
     	"cookie": "assets/jquery-cookie/jquery.cookie",
          // 模板插件$("#teacherform").ajaxSubmit({})
     	"template": "assets/artTemplate/template",
     	"bootstrap": "assets/bootstrap/js/bootstrap.min",
          // 获取地址栏信息公共方法
     	"getUrl":"static/js/getUrl",
          // 进度条插件
     	"nprogress": "assets/nprogress/nprogress",
          // 日期插件
     	"datepicker":"assets/bootstrap-datepicker/js/bootstrap-datepicker.min",
          // 设置日期为中文js
     	"datepicker-zh":"assets/bootstrap-datepicker/locales/bootstrap-datepicker.zh-CN.min",
          // 表单验证插件
          "jquery-validate":"assets/jquery-validate/jquery-validate.min",
          // 富文本插件
          "ckeditor":"assets/ckeditor/ckeditor",
          // 省级联动插件（省市县）需要配合region.json文件使用
          "region":"assets/jquery-region/jquery.region",
          // 图片上传插件
          "uploadify":"assets/uploadify/jquery.uploadify"
          
     },
     shim:{
     	"bootstrap":{
     		deps:["jquery"]
     	},
     	"datepicker-zh":{
     		deps:["datepicker"]
     	},
          "jquery-validate":{
               deps:["jquery"]
          },
          "ckeditor":{
               exports:"CKEDITOR"
          },
          "uploadify":{
               deps:["jquery"]
          }
     }
});