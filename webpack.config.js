var path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackManifestPlugin = require('webpack-manifest-plugin');

const ModernBuildPlugin = require(path.resolve(__dirname, 'src/webpack/modernBuildPlugin'));

const isModern = process.env.BROWSERS === 'modern';
const extraPath = isModern ? 'modern' : 'fallback';

module.exports = {
    mode: 'production',
    entry: {
        bundle: [path.resolve(__dirname, 'src/index.js')],
    },
    output: {
        path: path.resolve(__dirname, `dist/${extraPath}`),
        filename: 'app.bundle.js',
        publicPath: `dist/${extraPath}/`,
    },
    resolve: {
        extensions: ['*', '.js', ],
        modules: ['node_modules', path.resolve(__dirname, 'src')],
    },
    module: {
        rules: [
            {
                test: /.js$/,
                loaders: ['babel-loader'],
                include: path.resolve(__dirname, 'src'),
                exclude: [/node_modules/],
            }
        ],
    },
    plugins: [
        new WebpackManifestPlugin({
            fileName: path.join(__dirname, 'dist', extraPath, 'manifest.json'),
        }),
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, 'index.html'),
            template: path.resolve(__dirname, 'src/template.html'),
            inject: false,
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: false,
                removeScriptTypeAttributes: false,
                removeStyleLinkTypeAttributes: false,
                useShortDoctype: true,
            }
        }),
        ...(isModern ? [new ModernBuildPlugin()] : []),
    ],
    optimization: {
        minimizer: [
            new TerserPlugin({
                test: /\.js(\?.*)?$/i,
            }),
        ],
    },
    devServer: {
        contentBase: path.join(__dirname),
        port: 9000,
        publicPath: 'dist',
        writeToDisk: true,
        compress: true
    },
};
