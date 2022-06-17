/**
 * @name webpack.server.config
 * @description 服务端打包配置
 * @author AEX 前端团队
 * @create_date 2022/06/07 15:47:23
 */
const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const baseConfig = require('./webpack.base.config.js');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');

module.exports = merge(baseConfig, {
	// 这允许 webpack 以 Node 适用方式处理模块加载
	// 并且还会在编译 Vue 组件时，
	// 告知 `vue-loader` 输送面向服务器代码(server-oriented code)。
	target: 'node',

	// 将 entry 指向应用程序的 server entry 文件
	entry: {
		server: path.resolve(__dirname, '../src/entry-server.js'),
	},
	output: {
		// 此处告知 server bundle 使用 Node 风格导出模块(Node-style exports)
		libraryTarget: 'commonjs2',
	},

	// 不打包 node_modules 第三方包，而是保留 require 方式直接加载
	externals: [
		nodeExternals({
			// 白名单中的资源依然正常打包
			// 可以在这里添加更多的文件类型。例如，未处理 *.vue 原始文件，
			// 还应该将修改`global`（例如polyfill）的依赖模块列入白名单
			allowlist: [/\.css$/],
		}),
	],

	plugins: [
		// 这是将服务器的整个输出构建为单个 JSON 文件的插件。
		// 默认文件名为 `vue-ssr-server-bundle.json`
		new VueSSRServerPlugin(),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
			'process.env.VUE_ENV': '"server"',
		}),
		// new webpack.container.ModuleFederationPlugin({
		// 	name: '__REMOTE_SSR',
		// 	library: { type: 'commonjs-module', name: '__REMOTE_SSR' },
		// 	remoteType: 'commonjs-module',
		// 	// 提供给其他服务加载的文件
		// 	remotes: {
		// 		__REMOTE_HOME: '__REMOTE_HOME@http://localhost:8080/page/remoteEntry.js',
		// 	},
		// 	// shared: getShared()
		// }),
	],
});
