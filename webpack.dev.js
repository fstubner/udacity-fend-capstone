const path = require('path');
const webpack = require('webpack');
const HTMLWebPackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');

module.exports = {
    target: 'node',
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        port: 8080,
        static: './dist/',
    },
    entry: './src/client/index.mjs',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.s?css$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource'
            }
        ]
    },
    plugins: [
        new HTMLWebPackPlugin({
            template: './src/client/views/index.html',
            filename: './index.html'
        }),
        new FaviconsWebpackPlugin({
            logo: './src/client/images/favicon.png',
            favicons: {
                icons: {
                    favicons: true,
                    appleStartup: false,
                    appleIcon: false,
                    android: false,
                    windows: false,
                    yandex: false
                }
            }
        }),
        new CircularDependencyPlugin({
            // exclude detection of files based on a RegExp
            exclude: /node_modules/,
            // add errors to webpack instead of warnings
            failOnError: true,
            // allow import cycles that include an asyncronous import,
            // e.g. via import(/* webpackMode: "weak" */ './file.js')
            allowAsyncCycles: false,
            // set the current working directory for displaying module paths
            cwd: process.cwd(),
        })
    ],
    resolve: {
        fallback: {
            "fs": false,
        }
    },
    output: {
        clean: true,
        libraryTarget: 'var',
        library: 'Client',
        assetModuleFilename: 'assets/[name].[contenthash][ext]'
    },
    stats: {
        nestedModules: true,
        dependentModules: true,
        groupModulesByPath: true
    }
}