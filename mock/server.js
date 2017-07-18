const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');
const router = new Router();
const koaBody = require('koa-body');

const User = require('./user/user.js');

app.use(koaBody({multipart: true}));  


// 登录信息
let loginInfo = require('./loginAndSign/loginAndSign.js');
router.get('/api/loginInfo', async (ctx) => {
	function getUser(){
		return new Promise((resolve,reject) => {
			User.find((err,data) => {
				resolve(data);
			});
		})
	}
	let content = await getUser();
	ctx.body = content;
});

// 注册信息

router.post('/api/signInfo', async (ctx) => {
	const data = ctx.request.body;
	const sign = new User(data);
	sign.save();
	
	ctx.body = {
        errno: 0,
        msg: 'ok'
    }
});

app.use(router.routes())
	.use(router.allowedMethods());
app.listen(3000);
console.log('project has started on port 3000');

