var path = require('path');
var webpack = require('webpack'); 

var ExtractTextPlugin = require("extract-text-webpack-plugin");
// var extractLESS = new ExtractTextPlugin('less/[name].less');
// var extractCSS = new ExtractTextPlugin('css/[name].css'); // [name]_[contenthash:4]

var rootPath = path.resolve(__dirname, 'static');

var Clean = require('clean-webpack-plugin');


// var commonsPlugin = new webpack.optimize.CommonsChunkPlugin({
// 	name: 'commons/comm',
// 	filename:"comm.js",
// 	minChunks: Infinity
// });

module.exports = {



	entry: {
		"index": './index/index.es6',
		"task": './task/task.es6'

	},

	output: {
		path: rootPath,
		publicPath: "/static/",
		filename: 'js/[name].js'
	},

	devServer: {
		contentBase: './',
		port: 10086,
		inline: true
	},


	//插件
	plugins: [

		//new Clean("static/**/*", rootPath),
		//commonsPlugin,

		// 将第三方库作为公用的chunk
		new webpack.optimize.CommonsChunkPlugin('js/comm.js'),

		// 给js中剥离的css的文件指定名称
		new ExtractTextPlugin('/css/[name].css')

		//new ExtractTextPlugin("./css/[name]-[id]-[].css")
	],

	module: {
		loaders: [

			{
				test: /\.es6$/,
				loader: 'babel?presets[]=es2015'
			}, 		 

			{
				test: /\.less$/,
				loader: ExtractTextPlugin.extract('style', 'css!less')
			},

			{
				test: /\.(png|jpg)$/,
				loader: 'url?limit=2048&name=imgs/[name]_[hash:4].[ext]'
			}

			//图片文件使用 url-loader 来处理，小于8kb的直接转为base64
			// {
			// 	test: /\.(png|jpg)$/,
			// 	loader: 'file-loader?name=/img/[name]_[hash:4].[ext]'
			// }


			//{ test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
			//{ test: /\.less$/, loader: 'style!css!less'},
			// {
			// 	test: /\.less$/,
			// 	loader: ExtractTextPlugin.extract("style-loader", "css-loader", 'less-loader')
			// },

			//{test: /\.less$/i, loader: extractCSS.extract(['css?-url','less'])}, ?root=..


		]
	},


	resolve: {
		//查找module的话从这里开始查找
		root: './', //绝对路径
		//自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
		extensions: ['', '.js', '.json', '.scss', '.es6'],
		//模块别名定义，方便后续直接引用别名，无须多写长长的地址
		alias: {
			AppStore: 'js/stores/AppStores.js', //后续直接 require('AppStore') 即可
			ActionType: 'js/actions/ActionType.js',
			AppAction: 'js/actions/AppAction.js'
		}
	}


}