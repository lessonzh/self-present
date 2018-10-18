let mongoose = require('mongoose');
let Schema = mongoose.Schema;

// 定义表结构
let DemoSchema = new Schema({
	title:String,
	sub_title:String,
	skill:String,
	uploadtime:{
		type:Date,
		default:Date.now
	},
	thumb:String,
	detail_md:String,
	tag:String,
	sort:Number
});

// 参数User 数据库中的集合名称, 不存在会创建.
let DemoList = mongoose.model('DemoList', DemoSchema);

module.exports = DemoList;