# 网盘国际化 Web 主站

node 版本在 v10.15.0 左右，npm v6.14.6 左右，如果使用的是 Mac M1 的芯片，并且如果自己的 pc 用的是 nvm，在 nvm 装对应版本的 node 的时候会出现 arm64_linux86_gas 等错误，请在控制台执行 `arch -x86_64 zsh`，再重新 nvm instal 即可。

如果 npm install 失败，请使用 `npm install --registry=http://registry.npm.baidu-int.com`

`npm run analyzer` 之后，cd 到 output，运行 http-server（需要先全局安装一下），启动服务之后 访问 `服务地址/report.html`

### sitemap更新
先装依赖，在本地执行一下npm run build:sitemap，将asstes/others/sitemap.xml文件提交到仓库即可
注意：因为爬虫服务不稳定，所以必须在控制台看到如下四条日志输出才算完成，sitemap.xml格式化之后预计会 >2500行
`1) launch puppeteer browser~`

`2) get help-center sub question done~`

`3) Crawled successfully, merged data, ready to write`

`4) Congratulations~~Update the sitemap.xml file successfully~~`

### 加载依赖

```
npm install
```

### 本地开发

```
npm run dev:serve
```

### 开发机调试

```
npm run dev:release
```

### 编译打包

```
npm run build
```

### 项目文档查看和编写

```
npm run doc:serve
```

### 推项目到开发机

1，装 release 插件：egg-deploy-client，由于没开放到外部 npm 无法直接 npm install egg-deploy-client 安装。
安装方式：npm install http://gitlab.baidu.com/wangpanfe/egg-deploy-client/repository/archive.tar.gz?ref=1.2.0

2，.dcrd.js 中 receiver 设置为你开发机环境

2，发布前 build：npm run build

3，推到开发机：npm run release

### 编译机
测试...
