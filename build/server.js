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
const setupDevServer = require('../build/setup.dev.config');

const idDev = process.env.NODE_ENV === 'development';
let renderer, onReady;
const server = new express();

if (idDev) {
	onReady = setupDevServer(server, (serverBundle, template, clientManifest) => {
		renderer = createBundleRenderer(serverBundle, {
			template,
			clientManifest,
		});
	});
} else {
	const template = fs.readFileSync(path.join(__dirname, '../public/index.html'), 'utf-8');
	const serverBundle = require('../dist/vue-ssr-server-bundle.json'); // build 出来的服务端文件
	const clientManifest = require('../dist/vue-ssr-client-manifest.json'); // build 出来的客户端文件
	renderer = createBundleRenderer(serverBundle, { runInNewContext: false, template, clientManifest });
}

server.use(express.static(path.join(__dirname, '../dist/'), { index: false })); // 不设置为 false 会导致无法查看网页源代码，搜索引擎将无法爬取

const render = (req, res) => {
	res.set('Content-Type', 'text/html;charset-utf-8;');
	renderer.renderToString(
		{
			url: req.url,
			title: 'Hello SSR',
			meta: `<meta name="description" content="搭建ssr">`,
		},
		(err, html) => {
			if (err) {
				console.log('err', err);
				res.end('<div>SSR Error </div>');
			} else {
				res.end(html);
			}
		}
	);
};

server.get(
	'*',
	idDev
		? async (req, res) => {
				await onReady;
				render(req, res);
		  }
		: render
);

server.listen(3000, () => {
	console.log('服务启动: http://localhost:3000');
});
