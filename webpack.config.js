var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var cssnext = require('postcss-cssnext')
var partialImport = require('postcss-partial-import')
var nested = require('postcss-nested')

var path = require('path')
var fs = require('fs')

module.exports = {
	entry: "./main.js", // Root component
	output: {
		path: './',
		filename: 'index.js'
	},
	devServer: {
		inline: true,
		port: 3333
	},
	module: {
		loaders: [
			{
				test: /\.js?$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel',
				query: {
					presets: ['react', 'es2015']
				}
			},
			{
				test: /\.css$/, // Only .css files
				//loader: 'style!css' // Run both loaders
				loader: "style-loader!css-loader!postcss-loader"
				//test: /\.css$/,
				//loader: ExtractTextPlugin.extract('style-loader', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader')
			}
		]
	},
	postcss: [
			cssnext,
			partialImport,
			nested
		],

	plugins: [
		new ExtractTextPlugin('style.css', { allChunks: true }),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.NoErrorsPlugin()
	]

}