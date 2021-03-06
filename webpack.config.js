var webpack = require('webpack');
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var path = require('path');
var env = require('yargs').argv.mode;
var libraryName = '[name]';
var plugins = [], outputFile;

if (env === 'build') {
	plugins.push(new UglifyJsPlugin({minimize: true}));
	outputFile = libraryName + '.min.js';
} else {
	outputFile = libraryName + '.js';
}

var config = {
	entry: {
		'veams': __dirname + '/src/js/veams.js',
		'veams-core': [__dirname + '/src/js/generics/core.js'],
		'common/component': [__dirname + '/src/js/common/component.js'],
		'common/base': [__dirname + '/src/js/common/base.js'],
		'services/http': __dirname + '/src/js/services/http.js'
	},
	devtool: 'source-map',
	output: {
		path: __dirname + '/lib',
		filename: outputFile,
		library: [libraryName, "[name]"],
		libraryTarget: 'umd',
		umdNamedDefine: true
	},
	module: {
		loaders: [
			{
				test: /(\.jsx|\.js)$/,
				loader: 'babel',
				exclude: /(node_modules|bower_components)/
			},
			{
				test: /(\.jsx|\.js)$/,
				loader: "eslint-loader",
				exclude: /node_modules/
			}
		]
	},
	resolve: {
		root: path.resolve('./src'),
		extensions: ['', '.js']
	},
	plugins: plugins
};

module.exports = config;
