#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

//
// 1. Get the project name from the command line args
//
const projectName = process.argv[2];
if (!projectName) {
  console.error("❌ Please provide a project name: react-webpack-scaffold my-app");
  process.exit(1);
}

//
// 2. Create the full path for the new project folder
//
const projectPath = path.join(process.cwd(), projectName);

if (fs.existsSync(projectPath)) {
  console.error(`❌ Folder "${projectName}" already exists in this location.`);
  process.exit(1);
}

//
// 3. Make the new folder
//
fs.mkdirSync(projectPath);

console.log(`📁 Creating new project in ${projectPath}...`);

//
// Helper to write files inside the project folder
//
function writeFile(filePath, content) {
  const fullPath = path.join(projectPath, filePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content.trimStart());
}

//
// 4. Write package.json
//
writeFile("package.json", `
{
  "name": "${projectName}",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "start": "webpack serve --open --config webpack.config.js",
    "build": "webpack --config webpack.config.js"
  },
  "dependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  },
  "devDependencies": {
    "@babel/core": "^7.21.0",
    "@babel/preset-env": "^7.21.0",
    "@babel/preset-react": "^7.18.6",
    "babel-loader": "^9.1.2",
    "css-loader": "^6.7.3",
    "html-webpack-plugin": "^5.5.0",
    "style-loader": "^3.3.3",
    "webpack": "^5.78.0",
    "webpack-cli": "^5.0.1",
    "webpack-dev-server": "^4.13.3"
  }
}
`);

//
// 5. .babelrc
//
writeFile(".babelrc", `
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
`);

//
// 6. webpack.config.js
//
writeFile("webpack.config.js", `
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true,
    publicPath: '/',
    assetModuleFilename: 'images/[hash][ext][query]'
  },
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
    hot: true,
    open: true,
    historyApiFallback: true
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      { test: /\\.(js|jsx)$/, exclude: /node_modules/, use: 'babel-loader' },
      { test: /\\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\\.(png|jpe?g|gif|svg)$/i, type: 'asset/resource' }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ]
};
`);

//
// 7. public/index.html
//
writeFile("public/index.html", `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>React App</title>
</head>
<body>
  <div id="root"></div>
</body>
</html>
`);

//
// 8. src/index.jsx
//
writeFile("src/index.jsx", `
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
`);

//
// 9. src/App.jsx (no image)
//
writeFile("src/App.jsx", `
import React from 'react';

function App() {
  return (
    <div>
      <header>
        <h1>React Essentials</h1>
        <p>Fundamental React concepts you will need for almost any app you are going to build!</p>
      </header>
      <main>
        <h2>Time to get started!</h2>
      </main>
    </div>
  );
}

export default App;
`);

//
// 10. src/index.css
//
writeFile("src/index.css", `
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 20px;
}
`);

//
// 11. Install dependencies inside the new folder
//
console.log("📦 Installing dependencies with Yarn...");
execSync("yarn install", { cwd: projectPath, stdio: "inherit" });

console.log(`✅ Project "${projectName}" created successfully!`);
console.log(`👉  Next steps:
   cd ${projectName}
   yarn start`);