const webpack = require('webpack');
const path = require('path');
const { paths, environments } = require('./tasks/config/options');
const _ = require('./tasks/config/helpers');

let rules = require('require.all')('./tasks/rules');

module.exports = env => {
    let environment = env.NODE_ENV;
    env.NODE_ENV = JSON.stringify(environment);

    rules((name, rule) => rule(environment, environments));

    return ({
        entry: {
            app: _.files(paths.app.scripts.app),
            vendor: _.files(paths.app.scripts.vendor)
        },
        output: {
            path: path.resolve(__dirname, _.folder(paths.dist.scripts)),
            filename: '[name].js',
            publicPath: '/scripts/'
        },
        module: {
            rules: [
                rules.scriptsLint,
                rules.scripts,
                rules.css,
                rules.html
            ]
        },
        resolve: {
            extensions: ['.ts', '.js'],
            modules: [
                path.resolve(__dirname, _.folder(paths.dist.css.scripts)),
                'node_modules'
            ],
            alias: {
                '~': path.resolve(__dirname, _.folder(paths.app.scripts)),
                'vue$': 'vue/dist/vue.runtime.common.js'
            }
        },
        plugins: [
            new webpack.DefinePlugin({
                'global': {}
            }),
            // extract vendor as a separate bundle
            new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.js' }),
        ],
        devtool: (() => environment === environments.production ? false : 'inline-source-map')()
    })
};