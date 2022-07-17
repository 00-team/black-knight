import { Configuration } from 'webpack'

import BASE from './base'
import HtmlPlugins from './config/django-html'
import { DevStyle } from './config/style'

const DjangoConfig: Configuration = {
    ...BASE,
    watch: true,
    mode: 'development',
    module: {
        rules: [...BASE.module!.rules!, DevStyle],
    },
    plugins: [...BASE.plugins!, ...HtmlPlugins],
}

export default DjangoConfig
