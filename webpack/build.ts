// types
import Compression from 'compression-webpack-plugin'
import CssMinimizer from 'css-minimizer-webpack-plugin'
import { Configuration } from 'webpack'

import BASE from './base'
// plugins
import HtmlPlugins from './config/django-html'
// styles
import { BuildStyle, CssExtract } from './config/style'

const BuildConfig: Configuration = {
    ...BASE,
    mode: 'production',
    module: {
        rules: [...BASE.module!.rules!, BuildStyle],
    },
    plugins: [
        ...BASE.plugins!,
        new CssExtract(),
        new Compression({ exclude: /\.(html)$/ }),
        ...HtmlPlugins,
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
