path = require('path');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/app.js',
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    mode: 'production',
    devServer: {
        open: true,
        port: 8000
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [{
                from: path.resolve(__dirname, 'src/public'),
            }]
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css'
        })
    ],
    module: {
        rules: [
            {
                test: /\.(scss)$/,
                    use: [
                        // {
                        //     // inject CSS to page
                        //     loader: 'style-loader'
                        // }, 
                        {
                            loader: MiniCssExtractPlugin.loader
                        },
                        {
                            // translates CSS into CommonJS modules
                            loader: 'css-loader'
                        }, 
                        {
                            // Run postcss actions
                            loader: 'postcss-loader',
                            options: {
                                // `postcssOptions` is needed for postcss 8.x;
                                // if you use postcss 7.x skip the key
                                postcssOptions: {
                                    // postcss plugins, can be exported to postcss.config.js
                                    plugins: function () {
                                        return [
                                            require('autoprefixer')
                                        ];
                                    }
                                }
                            }
                        }, 
                        {
                            // compiles Sass to CSS
                            loader: 'sass-loader'
                        },
                    ]
            }
        ]
    }
}