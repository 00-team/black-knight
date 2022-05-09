// styles
import { DevStyle } from './config/style'

// path
import { APP_DIR } from './config/path'
import { resolve } from 'path'

// plugins
import HtmlWP from 'html-webpack-plugin'

// base configs
import Main from './main'

const BACKEND = 'http://localhost:7000/'

const DevConfig = {
    ...Main,
    mode: 'development',
    module: {
        rules: [...Main.module!.rules!, DevStyle],
    },
    plugins: [
        ...Main.plugins!,
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
            '/admin/api': BACKEND,
            '/m': BACKEND,
            '/s': BACKEND,
            '/favicon.ico': BACKEND,
        },
    },
}

export default DevConfig
