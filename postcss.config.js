const purgeCSS = require('@fullhuman/postcss-purgecss');
console.log('----- BUILDING FOR -----')
console.log(process.env.NODE_ENV);
const cleanCSS = require('postcss-clean');

// postcss.config.js
module.exports = {
    parser: 'postcss-scss',
    plugins: [
        require('@csstools/postcss-sass'),
        require('postcss-easy-import')({
            prefix: "_"
        }),
        process.env.NODE_ENV === 'production' ? (
            console.log('----- Minifying and purging the CSS -----'),
            cleanCSS({
                level: 2
            })
        ) : null,
        process.env.NODE_ENV === 'production'
        ?
            purgeCSS({
                enabled: true,
                content: ['./src/templates/**/*.twig'],
                whitelist: [
                    'active',
                ]
            })
        : null
    ]
}
