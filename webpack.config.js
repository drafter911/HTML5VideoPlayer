var webpack = require("webpack");

module.exports = {
    entry: "./source/js/main.js",

    output: {
        publicPath: "./public/js/",
        filename: "./public/js/bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: "babel-loader"
            }
        ]
    }
};