// types
import { Configuration } from 'webpack'

// styles
import { BuildStyle, CssExtract } from './config/style'

// plugins
import HtmlPlugins from './config/django-html'
import Compression from 'compression-webpack-plugin'
import CssMinimizer from 'css-minimizer-webpack-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'

// Main configs
import Main from './main'

const BuildConfig: Configuration = {
    ...Main,
    mode: 'production',
    module: {
        rules: [...Main.module!.rules!, BuildStyle],
    },
    plugins: [
        ...Main.plugins!,
        new CssExtract(),
        new Compression({ exclude: /\.(html)$/ }),
        ...HtmlPlugins,
        new BundleAnalyzerPlugin({ openAnalyzer: false }),
    ],
    optimization: {
        emitOnErrors: false,
        chunkIds: 'deterministic',
        minimize: true,
        minimizer: [new CssMinimizer()],
        splitChunks: {
            chunks: 'all',
            maxSize: 200_000,
            minSize: 20_000,
            hidePathInfo: true,
        },
    },
}

export default BuildConfig
