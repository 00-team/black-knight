// types
import { Configuration } from 'webpack'

// styles
import { DevStyle } from './config/style'

import HtmlPlugins from './config/django-html'

// Main configs
import Main from './main'

const DjangoConfig: Configuration = {
    ...Main,
    watch: true,
    mode: 'development',
    module: {
        rules: [...Main.module!.rules!, DevStyle],
    },
    plugins: [...Main.plugins!, ...HtmlPlugins],
    devtool: 'source-map',
}

export default DjangoConfig
