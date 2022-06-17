module.exports = {
	presets: [
		[
			'@babel/preset-env',
			{
				useBuiltIns: 'usage',
				corejs: 3,
				targets: '> 0.2%,last 2 versions,not ie <= 10,not dead',
			},
		],
	],
	plugins: [
		[
			'@babel/plugin-transform-runtime',
			{
				corejs: 3,
			},
		],
		[
			'component',
			{
				libraryName: 'aex-ui',
				styleLibraryName: 'theme',
			},
		],
	],
};
