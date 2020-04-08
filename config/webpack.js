const path = require('path')
const HtmlPlugin = require('html-webpack-plugin');
module.exports = {
    entry: path.resolve(__dirname, '../src/index.js'),
    output: {
        filename: 'modal-x.js',
        library: 'modalx',
        libraryExport: 'default',
        libraryTarget: 'umd',
    },

    module: {
        rules: [

            {
                test: /\.scss/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader',
            },

            {
                test: /\.js$/,
                use: 'babel-loader'
            },

            {
                test: /\.ts$/,
                use: 'ts-loader'
            }
        ]
    },

    devServer: {
        port: 8099,
    },
    plugins: [
        new HtmlPlugin({
            inject: false,
            template: 'index.html'
        })
    ]
};