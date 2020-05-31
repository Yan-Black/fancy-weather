const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    devtool: 'source-map',
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
            }
        },{
            test: /\.css$/,
            use: [
                MiniCssExtractPlugin.loader,
                'style-loader',
                'css-loader',
            ]
        },{
            test: /\.html$/,
            use: [{
                loader: 'html-loader'
            }]
        },{
            test: /\.(png|jpe?g|git|svg)$/,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        outputPath: 'images',
                        name: '[hash].[ext]'
                    }
                }
            ]
        }]
    },  
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css'
        })
    ]
}