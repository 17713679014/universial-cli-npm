// init.js
// 引入Node.js的util模块中的promisify函数，用于将基于回调的函数转换为返回Promise的函数
let { promisify } = require('util')
// 引入ora模块，用于创建终端中的旋转加载指示器
const ora = require('ora')
// 引入并转换download-git-repo模块，使其支持Promise，用于下载Git仓库
const download = promisify(require('download-git-repo'))
// 引入chalk模块，用于在终端中显示彩色文本
let chalk = require('chalk')
// 引入inquirer模块，用于创建交互式命令行界面
let inquirer = require('inquirer')
// 引入并转换figlet模块，用于生成ASCII艺术文字
let asyncFiglet = promisify(require('figlet'))

// 定义一个日志打印函数，使用chalk来输出黄色文本
const log = (content) => console.log(chalk.yellow(content))

// 定义一个异步函数来打印LOGO，使用figlet生成特定文本的ASCII版本
async function printLogo() {
  let data = await asyncFiglet('police-cli')
  log(data)
}
// 导出一个异步函数，接收应用程序名称作为参数
module.exports = async (appName) => {
  // 在初始化过程中首先打印LOGO
  await printLogo()
  log(`🚀 创建项目 ${appName}`)
  // 使用inquirer向用户展示一个选择列表，让用户选择项目模板
  let answer = await inquirer.prompt([ 
    {
      name: 'language',
      type: 'list',
      message: 'Please pick a present:',
      choices: [
        'universal-cli',
      ],
    },
  ])
  // 根据用户的选择来决定如何初始化项目。如果选择了Vue 2模板，会从指定的Git仓库下载模板
  if (answer.language == 'universal-cli') {
    // 显示一个旋转的加载指示器，提示用户正在下载
    const spinner = ora('下载中...').start()
    try {
      // 下载用户选择的项目模板 
      await download(
        'direct:https://github.com/17713679014/universal-cli', // 模板Git仓库地址
        appName,
        { clone: true }
      )
      // 下载完成后，更新加载指示器的状态  
      spinner.succeed('下载完成')
      // 打印后续操作的指令给用户
      log(`
        下载完成，请执行下面命令启动项目：
        ===========================
        cd ${appName}
        yarn 或者 npm install
        
        npm run dev
        或者
        yarn dev
        `)
    } catch (error) {
      log(`下载失败`, error)
      spinner.stop()
    } 
  }
}

