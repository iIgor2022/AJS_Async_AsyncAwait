const path = require('path');

module.exports = {
	module: {
		rules: [{
			test: /\.js&/,
			exclude: /node-modules/,
			loader: 'babel-loader'
		}]
	}
}