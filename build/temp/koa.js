/**
 * @name server.js
 * @description node(koa)服务
 * @author AEX 前端团队
 * @create_date 2022/03/31 17:37:26
 */

const Koa = require('koa');
const static = require('koa-static');
const Router = require('@koa/router');
const path = require('path');
const fs = require('fs-extra');
const template = fs.readFileSync(path.join(__dirname, '../public/index.html'), 'utf-8');
// const renderer = require('vue-server-renderer').createRenderer({ template });
const serverBundle = require('../dist/vue-ssr-server-bundle.json'); // build 出来的服务端文件
const clientManifest = require('../dist/vue-ssr-client-manifest.json'); // build 出来的客户端文件
const renderer = require('vue-server-renderer').createBundleRenderer(serverBundle, { template, clientManifest });

// const entryServerApp = require('../src/entry-server.js');

const app = new Koa();
const router = new Router();
app.use(static(path.join(__dirname, '../dist')));

router.get('/(.*)', async (ctx) => {
	try {
		ctx.type = 'text/html; charset=utf-8';
		console.log(ctx.url);
		// let vm = await entryServerApp({ url: ctx.url });
		// const html = await renderer.renderToString(vm);
		const context = {
			url: ctx.url,
			title: 'Hello SSR',
			meta: `<meta name="description" content="搭建ssr">`,
		}
		const html = await renderer.renderToString(context,());
		console.log('html', html);
		ctx.body = html;
	} catch (err) {
		console.log('err', err);
	}
});
app.use(router.routes()).use(router.allowedMethods());

const server = app.listen(3000, () => {
	console.log('服务启动');
});
