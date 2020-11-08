const path = require('path');

module.exports = {
    entry: './src/Hyperlink.js',
    resolve: {
        modules: [path.join(__dirname, 'src'),  'node_modules'],
        extensions: ['.js', '.ts']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        query: {
                            presets: [ '@babel/preset-env' ]
                        }
                    }
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
        path: path.join(__dirname, 'dist'),
        publicPath: '/',
        filename: 'bundle.js',
        library: 'Hyperlink',
        libraryTarget: 'umd'
    }
};
