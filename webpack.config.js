const path = require('path');
const TsImportPlugin = require('ts-import-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');

const PostCSSOptions = {
    plugins: () => [
        autoprefixer({
            browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4']
        })
    ]
};
module.exports = {
    entry: path.join(__dirname, 'app/web/index.tsx'),
    output: {
        path: path.resolve(__dirname, 'app/public/dist/'),
        publicPath: '/public/dist/',
        filename: '[name].js',
        chunkFilename: '[id].js'
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json", ".less", ".css"],
        modules: [
            'node_modules',
            path.join(__dirname, 'app/web'),
            path.join(__dirname, 'app/')
        ]
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                            getCustomTransformers: () => ({
                                before: [
                                    TsImportPlugin()
                                ]
                            }),
                            compilerOptions: {
                                module: 'es2015'
                            }
                        }
                    },
                ],
            },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: PostCSSOptions
                    },
                    {
                        loader: 'less-loader',
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['url-loader']
            },
            {
                test: /\.(eot|ttf|woff|woff2)$/,
                use: 'url-loader'
            }
        ]
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        }),
        new HtmlWebPackPlugin({
            template: path.join(__dirname, 'app/view/index.nj'),
            filename: path.join(__dirname, 'app/view/index.html'),
            minify: {
                collapseWhitespace: true
            },
            chunks: ['index']
        })
    ]
};