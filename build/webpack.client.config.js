/**
 * @name webpack.client.config
 * @description 客户端打包配置
 * @author AEX 前端团队
 * @create_date 2022/06/07 15:46:57
 */
const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.config.js');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');

module.exports = merge(baseConfig, {
	target: 'web',
	entry: {
		client: path.resolve(__dirname, '../src/entry-client.js'),
	},

	module: {
		rules: [
			// ES6 转 ES5
			{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: ['babel-loader'],
			},
		],
	},

	// 重要信息：这将 webpack 运行时分离到一个引导 chunk 中，
	// 以便可以在之后正确注入异步 chunk。
	optimization: {
		splitChunks: {
			name: 'manifest',
			minChunks: Infinity,
		},
	},

	plugins: [
		// 此插件在输出目录中生成 `vue-ssr-client-manifest.json`。
		new VueSSRClientPlugin(),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
			'process.env.VUE_ENV': '"client"',
		}),
		// new webpack.container.ModuleFederationPlugin({
		// 	name: '__REMOTE_SSR',
		// 	// library: { type: 'var', name: aexConfig.federation.name },
		// 	// remoteType: 'var',
		// 	// 提供给其他服务加载的文件
		// 	// remotes: {
		// 	// 	__REMOTE_HOME: '__REMOTE_HOME@http://localhost:8080/page/remoteEntry.js',
		// 	// },
		// 	// shared: getShared()
		// }),
	],
});
