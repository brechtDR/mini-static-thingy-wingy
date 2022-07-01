// plugins

const devMode = process.env.NODE_ENV !== "production";

const   path = require('path'),
        _ = require('lodash'),
        {CleanWebpackPlugin} = require('clean-webpack-plugin'), //remove/clean your build folder before building
        HtmlWebpackPlugin = require('html-webpack-plugin'), //copies html files
        MiniCssExtractPlugin = require('mini-css-extract-plugin'),
        CopyWebpackPlugin = require('copy-webpack-plugin');
        pages = require('./templates.json');

/*** exported css file ***/
const extractPlugin = new MiniCssExtractPlugin({ filename: './css/style.css' });

/*** html pages loop ***/
let templatePages = _.map(pages, function(page) {
    return new HtmlWebpackPlugin({
        filename: page.filename,
        template: page.template,
        inject: 'body',
    });
});

const config = {
    context: path.resolve(__dirname, "src"), //The source folder
    entry: {
        app: './app.js' //entry point for you main applications
        //vendors: './src/vendors.js' //optional: entry point for vendors (keep those nice and seperate)
    },
    output: {
        // Output path using nodeJs path module
        path: path.resolve(__dirname, 'build'), //The build folder
        filename: './js/website.js' //Where the js should be written to
    },
    module: {
        rules: [
            /**** BABEL LOADER ****/
            {
                test: /\.js$/, //let the loader know which file format it’s going to work on
                include: /src/, // let the loader know which directory it should work into
                exclude: /node_modules/, //which directory should it avoid while parsing
                use: {
                    loader: "babel-loader", //choose the loader, set the preset to environment. for using ES6 or higher
                    options: {
                        presets: ['env']
                    }
                }
            },
            /**** HTML LOADER (move html files to folder) ****/
            { test: /\.html$/, use: ['html-loader'] },

            /**** TWIG LOADER (convert twig to html) ****/
            { test: /\.twig$/, use: ['twig-loader'] },

            /**** CSS LOADER (convert css with postcss) ****/
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [  
                    
                    {
                        loader: MiniCssExtractPlugin.loader
                    },

                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: false
                        }
                    }, 
                    "postcss-loader"
                ],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                type: "asset/resource",
                        generator: {
                            filename: "assets/fonts/[name][ext]"
                        }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        extractPlugin,
        new CopyWebpackPlugin({
            patterns: [
                { from: 'assets', to: 'assets' },
            ]
        }),
    ].concat(templatePages),
    devServer: {
        static: {
            publicPath: path.join(__dirname, './src'),
            watch: true
        },
        open: true, //Opens browser when starting
        port: 5000, //Localhost port
        compress: true, //Enable gzip compression for everything served
        liveReload: true,
        hot: false
    },

};

module.exports = config;
