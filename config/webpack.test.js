module.exports = {
    module: {
        rules: [

            {
                test: /\.scss/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader',
            },

            {
                test: /\.js$/,
                use: 'babel-loader'
            },

            {
                test: /\.ts$/,
                use: 'ts-loader'
            },
            {
                test: /\.svg$/,
                use: {
                    loader: 'svg-inline-loader',
                    options: {
                        removeSVGTagAttrs: false
                    }
                },

            }
        ]
    },
};