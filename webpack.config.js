
const path = require('path');
const package = require('./package.json');
const webpackInput = package.config.webpack_input || '';
const webpackOutput = package.config.webpack_output || '';

module.exports = [
	{
		mode: 'production',
		devtool: 'source-map',
		stats: 'errors-only',
	  	entry: webpackInput,
	  	output: {
			path: path.join(__dirname, webpackOutput),
			filename: '[name].js',
	  	},
		module: {
			rules: [
				{
					test: /\.(js|jsx)$/,
					exclude: /node_modules/,
					use: {
						loader: 'babel-loader'
					}
			  	},
			]
	  	}
	}
	
];