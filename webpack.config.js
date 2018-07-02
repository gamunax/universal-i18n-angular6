const path = require('path');
const webpack = require('webpack');
const project = require(path.join(process.cwd(), 'project.json'));
var nodeExternals = require('webpack-node-externals');

const locales = Object.keys(project.locales);

const config = {
    entry: {
        server: './server.ts'
    },
    resolve: {
        extensions: ['.ts', '.js'],
        alias: {}
    },
    target: 'node',
    mode: 'none',
    externals: [/node_modules/],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [{
            test: /\.ts$/,
            loader: 'ts-loader'
        }]
    },
    plugins: [
        // Temporary Fix for issue: https://github.com/angular/angular/issues/11580
        // for 'WARNING Critical dependency: the request of a dependency is an expression'
        new webpack.ContextReplacementPlugin(
            /(.+)?angular(\\|\/)core(.+)?/,
            path.join(__dirname, 'src'), // location of your src
            {} // a map of your routes
        ),
        new webpack.ContextReplacementPlugin(
            /(.+)?express(\\|\/)(.+)?/,
            path.join(__dirname, 'src'),
            {}
        )
        /*new webpack.IgnorePlugin(/vertx/)*/
    ]
};

for (let i = 0; i < locales.length; i++) {
    config.resolve.alias[`main.server.${locales[i].toLowerCase()}`] = path.join(__dirname, 'dist', 'server', locales[i].toLowerCase(), 'main.js')
}

module.exports = config;
