import http from "http";
import path from "path";
import express from "express";
import webpack from "webpack";
import serveStatic from "serve-static";
import webpackDev from "webpack-dev-middleware";
import webpackHot from "webpack-hot-middleware";
import adminConfig from "./webpack.dev.config";

const adminCompiler = webpack(adminConfig);

const app = express();

app.use(
  webpackDev(adminCompiler, {
    publicPath: adminConfig.output.publicPath,
    hot: true,
  }),
);

app.use(
  webpackHot(adminCompiler, {
    log: console.log,
    reload: true,
  }),
);

app.use("/assets", serveStatic(path.resolve("./assets")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve("./index.html"));
});

http.createServer(app).listen(8080, () => {
  console.log("Dev server started on 8080");
});
