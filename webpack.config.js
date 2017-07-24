var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './app/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'index_bundle.js'
	},
	module: {
		rules: [
			{ test: /\.(js)$/, use: 'babel-loader'},
			{ test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader']},
			{
		    	test: /\.(jpe?g|png|gif|svg)$/i,
		        loaders: [
		            'file-loader?hash=sha512&digest=hex&name=assets/[name].[ext]',
		            {
		            	loader: 'image-webpack-loader',
		            	query: {
		            		mozjpeg: {
		            			progressive: true
		            		},
		            		optipng: {
		            			optimizationLevel: 7,
		            		},
		            		gifsicle: {
		            			interlaced: false
		            		}
		            	}
		            }
		        ]
		    }
		]
	},
	plugins: [new HtmlWebpackPlugin({
		template: 'app/index.html'
	})]
}