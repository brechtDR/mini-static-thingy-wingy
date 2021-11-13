const purgeCSS = require('@fullhuman/postcss-purgecss');
console.log('----- BUILDING FOR -----')
console.log(process.env.NODE_ENV);
console.log('----- Minifying and purging the CSS -----')
module.exports = {
    plugins: [
        require('postcss-import'),
        require('autoprefixer'),
        require('postcss-nested'),
        process.env.NODE_ENV === 'production'
            ?
                require('cssnano')({
                    preset: ['default', {
                        discardComments: {
                            removeAll: true,
                        },
                    }]
                })
            : null,
        process.env.NODE_ENV === 'production'
        ?
            purgeCSS({
                enabled: true,
                content: ['./src/templates/**/*.twig'],
                whitelist: [
                    'active',
                ],
                whitelistPatterns: [/js\-/, /badge\-/, /alert\-/],
            })
        : null

    ]
};
