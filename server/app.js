const Koa = require('koa')
const app = new Koa()
const bodyParser = require('koa-bodyparser');
const path = require('path')
const router = require('koa-router')();
const static = require('koa-static');
const mongoose = require('mongoose')
const dbOptions = require('./config/index');
const cors = require('koa2-cors');

const DemoListModel = require('./model/DemoList')

// 连接mongoDB数据库
mongoose.connect(dbOptions.url, dbOptions.options);
var db = mongoose.connection;

// 监听数据库连接状态
db.on('error', function (err) {
	console.log('db connection fail')
})
db.on('open', function () {
	console.log('db connection sucess');
})

//cors跨域 
app.use(cors());
app.use(bodyParser());


app.use(static(
	path.join(__dirname, 'admin')
))

//添加案例 
router.post('/addDemo', async(ctx) => {
	const data = ctx.request.body
	let resultData = await DemoListModel.create(data)
	.then(function(data){
		return data
	})
	.catch(function(err){
		return {
			code:1,
			msg:'添加失败'
		}
	})
	
	ctx.body = {
		code:0,
		msg:'添加成功',
		data:[
			resultData
		]
	}
	 
})

//修改案例 
router.post('/updateDemo', async(ctx) => {
	const _id = ctx.request.body.id //需要修改的id
	const data = ctx.request.body
	let resultData = await DemoListModel.update({_id:_id},data)
	.then(function(data){
		return 'ok'
	})
	.catch(function(err){
		return {
			code:1,
			msg:'修改失败'
		}
	})
	
	ctx.body = {
		code:0,
		msg:'修改成功',
		data:[
			
		]
	}
	 
})

//获取案例
 router.get('/getDemo',async(ctx)=>{
	 let resultData = await DemoListModel.find().sort({'sort':1})
	 .then(data=>{
		 return data
	 })
	 
	 ctx.body={
		 code:0,
		 msg:'',
		 data:resultData
	 }
 })

app.use(router.routes()); //启动路由
app.use(router.allowedMethods());

app.listen(3000)
