import { Configuration } from 'webpack'

// path
import { DIST_DIR } from './config/path'

// entries
import Entries from './config/entries'

// plugins
// import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
// new BundleAnalyzerPlugin({ openAnalyzer: false })

const Main: Configuration = {
    entry: Entries,
    output: {
        path: DIST_DIR,
        filename: '[name].[contenthash].js',
        chunkFilename: '[name].[id].chunk.js',
        clean: true,
        sourceMapFilename: 'source_maps/[file].map',
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
    plugins: [],
    resolve: {
        extensions: ['.mjs', '.tsx', '.ts', '.js'],
        // alias: {
        //     state: resolve(AO, 'state'),
        //     components: resolve(SRC_DIR, 'components'),
        // },
    },
}

export default Main
