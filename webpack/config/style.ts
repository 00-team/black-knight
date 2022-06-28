// plugins
import CssExtract from 'mini-css-extract-plugin'
import { RuleSetRule, RuleSetUseItem } from 'webpack'

const SassLoader: RuleSetUseItem = {
    loader: 'sass-loader',
    options: {
        sassOptions: {
            includePaths: ['./App/style'],
        },
    },
}

const DevStyle: RuleSetRule = {
    test: /\.(s|)[ac]ss$/i,
    use: ['style-loader', 'css-loader', SassLoader],
}
const BuildStyle: RuleSetRule = {
    test: /\.(s|)[ac]ss$/i,
    use: [
        CssExtract.loader,
        'css-loader',
        {
            loader: 'postcss-loader',
            options: {
                postcssOptions: {
                    plugins: ['autoprefixer'],
                },
            },
        },
        SassLoader,
    ],
}

export { DevStyle, BuildStyle, CssExtract }
