const PORT = parseInt(process.argv[2]) || 3000;

import webpack from "webpack";
import webpackDevServer from "webpack-dev-server";

import webpackDevConfig from "./config.dev.js";
webpackDevConfig.entry.unshift(`webpack-dev-server/client?http://localhost:${PORT}`, "webpack/hot/dev-server");

const compiler = webpack(webpackDevConfig);
const server = new webpackDevServer(compiler, { ...webpackDevConfig, hot: true,    compress: true,
    public: "http://192.168.1.103"});
server.listen(PORT);

console.log(`Dev server listening at http://localhost:${PORT}`); // eslint-disable-line no-console
