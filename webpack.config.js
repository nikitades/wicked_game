const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin')
module.exports = {
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, '_dist'),
        filename: 'bundle.[chunkhash].js',
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.txt$/,
                use: 'raw-loader'
            },
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            'env'
                        ]
                    }
                }
            },
            {
                test: /\.(png|svg|webp|jpg|gif|bmp)$/,
                use: 'file-loader'
            },
            {
                test: /\.css$/,
                use: {
                    loader: 'css-loader'
                },
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: '_src/index.html'
        }),
        new CleanWebpackPlugin(
            ['_dist'],
            {
                exclude: '_dist/sprites'
            }
        )
    ]
};