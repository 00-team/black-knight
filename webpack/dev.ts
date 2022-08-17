import HtmlWP from 'html-webpack-plugin'
import { resolve } from 'path'

import BASE from './base'
import { APP_DIR } from './config/path'
import { DevStyle } from './config/style'

const BACKEND = 'http://127.0.0.1:7000/'

const DevConfig = {
    ...BASE,
    mode: 'development',
    module: {
        rules: [...BASE.module!.rules!, DevStyle],
    },
    plugins: [
        ...BASE.plugins!,
        new HtmlWP({
            filename: 'index.html',
            template: resolve(APP_DIR, 'templates/react.html'),
            inject: true,
            publicPath: '/',
            minify: false,
        }),
    ],
    devServer: {
        port: 8000,
        hot: true, // true = full reload
        historyApiFallback: true,
        compress: true,
        client: {
            logging: 'none',
            reconnect: 7,
        },
        proxy: {
            context: ['/admin/api', '/m', '/s', '/favicon.ico'],
            target: BACKEND,
        },
    },
}

export default DevConfig
