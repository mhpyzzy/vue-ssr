/**
 * @name webpack.base.config
 * @description 公共配置
 * @author AEX 前端团队
 * @create_date 2022/06/07 15:37:33
 */

const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const path = require('path');
const resolve = (file) => path.resolve(__dirname, file);

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
	mode: isProd ? 'production' : 'development',
	output: {
		path: resolve('../dist/'),
		publicPath: '/dist/',
		filename: '[name].[chunkhash].js',
	},
	resolve: {
		alias: {
			// 路径别名，@ 指向 src
			'@': resolve('../src/'),
		},
		// 可以省略的扩展名
		// 当省略扩展名的时候，按照从前往后的顺序依次解析
		extensions: ['.mjs', '.js', '.jsx', '.vue', '.json', '.wasm', '.css'],
		fallback: {
			timers: require.resolve('timers-browserify'),
			path: require.resolve('path-browserify'),
			assert: require.resolve('assert/'),
		},
	},
	// devtool: isProd ? 'source-map' : 'cheap-module-eval-source-map',
	// devtool: 'cheap-module-eval-source-map',
	module: {
		rules: [
			// 处理 .vue 资源
			{
				test: /\.vue$/,
				loader: 'vue-loader',
			},

			// 处理图片资源
			{
				test: /\.(png|jpe?g|cur|gif|pdf|webp)(\?.*)?$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 8192,
							esModule: false,
							fallback: {
								loader: 'file-loader',
								options: {
									esModule: false,
									name: `static/img/[name].[hash:8].[ext]`,
								},
							},
						},
					},
				],
			},

			// 处理字体资源
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 4096,
							fallback: {
								loader: 'file-loader',
								options: {
									name: `static/fonts/[name].[hash:8].[ext]`,
								},
							},
						},
					},
				],
			},

			// 处理 CSS 资源
			// 它会应用到普通的 `.css` 文件
			// 以及 `.vue` 文件中的 `<style>` 块
			{
				test: /\.css$/,
				use: ['vue-style-loader', { loader: 'css-loader', options: { esModule: false } }],
			},

			{
				test: /\.less$/,
				use: [
					'vue-style-loader',
					{ loader: 'css-loader', options: { importLoaders: 2, esModule: false } },
					{
						loader: 'postcss-loader',
						options: { postcssOptions: { plugins: ['postcss-preset-env'] } },
					},
					'less-loader',
				],
			},
		],
	},
	plugins: [
		new VueLoaderPlugin(),
		new CaseSensitivePathsPlugin(),
		new webpack.ProvidePlugin({
			process: 'process/browser',
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
};

// | "var"
// | "module"
// | "assign"
// | "assign-properties"
// | "this"
// | "window"
// | "self"
// | "global"
// | "commonjs"
// | "commonjs2"
// | "commonjs-module"
// | "commonjs-static"
// | "amd"
// | "amd-require"
// | "umd"
// | "umd2"
// | "jsonp"
// | "system
