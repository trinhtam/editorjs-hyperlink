const path = require('path');

module.exports = {
    entry: './src/Hyperlink.js',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        query: {
                            presets: [ '@babel/preset-env' ],
                        },
                    },
                ]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(svg)$/,
                use: [
                    {
                        loader: 'raw-loader',
                    }
                ]
            }
        ]
    },
    output: {
        path: path.join(__dirname, '/dist'),
        publicPath: '/',
        filename: 'bundle.js',
        library: 'Hyperlink',
        libraryExport: 'default',
        libraryTarget: 'umd'
    }
};
