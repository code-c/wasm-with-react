const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {    
    // devServer: {
    //     mimeTypes: { 'application/wasm' : ['wasm'] },
    // },
                
    entry: 'index.js',
    output: {
        filename: 'bundle.js', //filename: 'bundle.[hash].js',
        path: path.resolve(__dirname, 'dist')
    },

    // gets rid of errors ascociated with importing fs and path into the Hello.js files
    externals: {
        fs: 'empty',
        path: 'empty',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public/index.html')
        })
    ],
    resolve: {
        modules: [__dirname, 'public', 'src', 'node_modules'],
        extensions: ['*', '.js', '.jsx', '.tsx', '.ts'],
      },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: require.resolve('babel-loader')
            },

            // use css loader for loading css?? 
            {
                test:/\.css$/,
                use:['style-loader','css-loader', 'sass-loader']
            },
            
            // runs file loader when parsing image files
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                'file-loader'
                ]
            },
                //adding wasm loading capability
            {
                test: /\.(wasm)$/,
                loader: 'file-loader',
                type: 'javascript/auto',
                //loader: 'wasm-loader',
                //type: 'application/wasm',
            },
        ],
    },
}
