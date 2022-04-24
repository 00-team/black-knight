import { RuleSetRule, RuleSetUseItem } from 'webpack'

// plugins
import CssExtract from 'mini-css-extract-plugin'

const SassLoader: RuleSetUseItem = {
    loader: 'sass-loader',
    options: {
        sassOptions: {
            includePaths: ['./App/src/style'],
        },
    },
}

const DevStyle: RuleSetRule = {
    test: /\.(s|)[ac]ss$/i,
    use: ['style-loader', 'css-loader', SassLoader],
}
const BuildStyle: RuleSetRule = {
    test: /\.(s|)[ac]ss$/i,
    use: [CssExtract.loader, 'css-loader', 'postcss-loader', SassLoader],
}

export { DevStyle, BuildStyle, CssExtract }
