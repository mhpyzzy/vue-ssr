/**
 * @name server.js
 * @description node(koa)服务
 * @author AEX 前端团队
 * @create_date 2022/03/31 17:37:26
 */

const express = require('express');
const path = require('path');
const fs = require('fs-extra');
const { createBundleRenderer } = require('vue-server-renderer');
const template = fs.readFileSync(path.join(__dirname, '../public/index.html'), 'utf-8');
// const renderer = require('vue-server-renderer').createRenderer({ template });
const serverBundle = require('../dist/vue-ssr-server-bundle.json'); // build 出来的服务端文件
const clientManifest = require('../dist/vue-ssr-client-manifest.json'); // build 出来的客户端文件
const renderer = createBundleRenderer(serverBundle, { runInNewContext: false, template, clientManifest });

// const entryServerApp = require('../src/entry-server.js');

const app = new express();
app.use(express.static(path.join(__dirname, '../dist/'), { index: false })); // 不设置为 false 会导致无法查看网页源代码，搜索引擎将无法爬取
app.get('*', (req, res) => {
	// req.setHeader('Content-Type', 'text/html;charset-utf-8;');
	res.set('Content-Type', 'text/html;charset-utf-8;');
	// ctx.type = 'text/html; charset=utf-8';
	console.log(req.url);
	// let vm = await entryServerApp({ url: req.url });
	// const html = await renderer.renderToString(vm);
	renderer.renderToString(
		{
			url: req.url,
			title: 'Hello SSR',
			meta: `<meta name="description" content="搭建ssr">`,
		},
		(err, html) => {
			if (err) {
				res.end('<div>SSR Error </div>');
			}
			console.log('htm----l', err, html);
			res.end(html);
		}
	);
});

app.listen(3000, () => {
	console.log('服务启动: http://localhost:3000');
});
