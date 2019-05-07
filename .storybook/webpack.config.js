const path = require('path')
module.exports = ({ config }) => ({
    ...config,
    module: {
        ...config.module,
        rules: [
            ...config.module.rules,
            {
                test: /\.(ts|tsx)$/,
                use: [
                    {
                        loader: require.resolve('awesome-typescript-loader'),
                    },
                ],
            },
        ],
    },
    resolve: {
        ...config.resolve,
        extensions: ['.ts', '.tsx', ...config.resolve.extensions],
    },
})
