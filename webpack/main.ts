import { Configuration } from 'webpack'

// path
import { DIST_DIR, resolve, APP_DIR } from './config/path'

// entries
import Entries from './config/entries'

// plugins
// import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
// new BundleAnalyzerPlugin({ openAnalyzer: false })

const Main: Configuration = {
    entry: Entries,
    output: {
        path: DIST_DIR,
        clean: true,
        filename: '[name].[contenthash].js',
        sourceMapFilename: 'source_maps/[file].map',
        assetModuleFilename: 'assets/[hash][ext][query]',
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: 'ts-loader',
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ],
    },
    devtool: 'source-map',
    plugins: [],
    resolve: {
        extensions: ['.mjs', '.tsx', '.ts', '.js'],
        alias: {
            state: resolve(APP_DIR, 'state'),
            components: resolve(APP_DIR, 'components'),
            comps: resolve(APP_DIR, 'components'),
        },
    },
}

export default Main
