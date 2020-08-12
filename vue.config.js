/*
 * @Author: your name
 * @Date: 2020-07-16 20:24:09
 * @LastEditTime: 2020-08-10 09:54:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \app\vue.config.js
 */
const path = require("path");
const CompressionPlugin = require("compression-webpack-plugin");
function resolve(dir) {
  return path.join(__dirname, dir); //path.join(__dirname)设置绝对路径
}

module.exports = {
  publicPath: "./",
  outputDir: "dist",
  indexPath: "index.html",
  productionSourceMap: false, //生成时构建map
  pages: {
    //多页面
    index: { entry: "src/main.js", template: "public/index.html", title: "" }, //后台主页
    // qrpage: {
    //   // 二维码展示页
    //   entry: "src/qrpage/qrpage.js",
    //   // 模板来源
    //   template: "public/qrpage.html",
    //   // 在 dist/index.html 的输出
    //   filename: "qrpage.html",
    //   // 当使用 title 选项时，
    //   // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
    //   title: "二维码显示页",
    //   // 在这个页面中包含的块，默认情况下会包含
    //   // 提取出来的通用 chunk 和 vendor chunk。
    //   chunks: ["qrpage"],
    //   //chunks: ["chunk-vendorsrrr", "chunk-commonrrr", "qrpage"],
    // },
  },
  chainWebpack(config) {
    // config.plugin("html").tap((args) => {
     // console.log(args)
    //   args[0].title = ""; //默认标题
    //   return args;
    // });
    // preload 是告诉浏览器页面必定需要的资源，浏览器一定会加载这些资源
    // prefetch 是告诉浏览器页面可能需要的资源，浏览器不一定会加载这些资源
    config.plugins.delete("prefetch-index"); //移除  提前加载
    config.plugins.delete("preload-index"); //移除  提前加载
    //config.plugins.delete("preload-qrpage"); //移除  提前加载
    //config.plugins.delete("prefetch-qrpage"); //移除  提前加载
    config.resolve.alias.set("@", resolve("./src"));
    config.module
      .rule("svg")
      .exclude.add(resolve("src/icons"))
      .end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
      })
      .end();
    if (process.env.NODE_ENV === "production") {
      config.module
        .rule("images")
        .use("image-webpack-loader")
        .loader("image-webpack-loader")
        .options({
          mozjpeg: { progressive: true, quality: 65 },
          optipng: { enabled: false },
          pngquant: { quality: [0.65, 0.9], speed: 4 },
          gifsicle: { interlaced: false },
          webp: { quality: 75 },
        })
        .end();
    }
    //console.log(config, "chainWebpack");
  },
  configureWebpack: (config) => {
    //console.log(config);
    if (process.env.NODE_ENV === "production") {
      // 为生产环境修改配置...
      return {
        plugins: [
          new CompressionPlugin({
            //开启gzip压缩
            test: /\.(js|css)(\?.*)?$/,
            filename: "[path].gz[query]",
            algorithm: "gzip",
            threshold: 10240, //10kb
            minRatio: 0.8,
          }),
        ],
        // externals: {
        //   vant: "vant", // 配置使用CDN
        //   Vue: "vue", // 配置使用CDN
        // },
      };
    } else {
      // 为开发环境修改配置...
      return {
        devtool: "eval-source-map",
        // externals: {
        //   vant: "vant", // 配置使用CDN
        //   Vue: "vue", // 配置使用CDN
        // },
      };
    }
  },
};
