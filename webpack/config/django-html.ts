import { Compiler } from 'webpack'

// path
import { BLACK_NIGHT, APP_DIR, resolve } from './path'

// plugins
import HtmlWP from 'html-webpack-plugin'

const HtmlPG = new HtmlWP({
    filename: resolve(BLACK_NIGHT, 'templates/base.html'),
    template: resolve(APP_DIR, 'templates/django.html'),
    inject: true,
    publicPath: '/dist/',
    minify: false,
})

class HtmlStatics {
    apply(compiler: Compiler) {
        compiler.hooks.compilation.tap('HtmlStatics', compilation => {
            HtmlWP.getHooks(compilation).alterAssetTagGroups.tapAsync(
                'HtmlStatics',
                (data, callback) => {
                    console.log(data.publicPath)
                    console.log(data.bodyTags)
                    console.log(data.headTags)

                    callback(null, data)
                }
            )
        })
    }
}

export default [HtmlPG, new HtmlStatics()]
