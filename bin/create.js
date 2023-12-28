// create.js
// 引入Node.js的path模块，用于处理文件和目录的路径
const path = require('path')
// 引入Node.js的fs模块，用于操作文件和目录
const fs = require('fs-extra')
// 引入Node.js的inquirer模块，用于创建交互式命令行界面
let inquirer = require('inquirer')
// 引入本地的init模块，这个模块可能用于初始化新项目
let init = require('./init')

// 导出一个异步函数，接收项目名称和选项作为参数
module.exports = async function (name, options) {
  // 获取当前命令行的工作目录
  const cwd = process.cwd()

  // 将工作目录和项目名称拼接，得到新项目的目标路径
  const targetAir = path.join(cwd, name)
  // 检查目标路径是否存在
  if (fs.existsSync(targetAir)) {
    // 如果传入了force选项，则直接删除原来的目标目录，构建新的目标目录
    if (options.force) {
      await fs.remove(targetAir)
    } else {
      // 如果没有传入force选项，通过inquirer询问用户是覆盖还是取消
      let answer = await inquirer.prompt([
        {
          name: 'language',
          type: 'list',
          message: `Target directory ${targetAir} already exists. Pick an action: (Use arrow keys)`,
          choices: ['Overwrite', 'Cancel'],
        },
      ])
      // 如果用户选择覆盖，则删除目标目录
      if (answer.language === 'Overwrite') {
        await fs.remove(targetAir)
      }
      // 如果用户选择取消，则终止操作  
      if (answer.language === 'Cancel') {
        return
      }
    }
  }
  // 调用引入的init函数，开始初始化项目
  init(name)
}

