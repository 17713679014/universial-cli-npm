#! /usr/bin/env node
// 上面代码是一个shebang行，指示系统使用Node.js环境来执行这个脚本。

// 引入了commander模块，这是一个用于创建命令行应用程序的库
let program = require('commander')
// 引入创建项目模块
let create = require('./create')

// 设置CLI应用程序的版本，版本号从项目的package.json文件中获取
program.version(`v${require('../package.json').version}`)
// 定义了一个命令行选项-n或--name，用于指定输出的名称
program.option('-n --name <type>', 'output name')

program
  // 定义了一个命令create，接受一个必需的app-name参数
  .command('create <app-name>')
  // 为create命令提供描述，说明这个命令用于创建一个新项目
  .description('create a new project')
  // 为create命令添加一个可选项-f或--force，用于在目标目录已存在时强制覆盖
  .option('-f, --force', 'overwrite target directory if iy exist')
  // 定义create命令的动作，调用create函数并传入名称和选项参数   
  .action(async (name, options) => {
    create(name, options)
  })

// 解析命令行参数
program.parse(process.argv)
