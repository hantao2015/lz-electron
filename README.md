##运行 yarn start-main-devPW 测试 5.运行 yarn packagePW
1."extraResources": [
  
 {
"from":"app/Electron.dll",
"to":"./"
}

    ],
    将dll文件放到resource目录下。

2.let HelloElectron = edge.func({
assemblyFile: `./resources/Electron.dll`,
typeName: 'Electron.Electron',
methodName: 'HelloElectron'
})
调用时将 resource 目录带上
// 8f17ea19945a19ad4b42bba33812ecee9340e664