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
3.文件更新服务器要用apach ，iis无法识别需要添加mime   *.yml--text/yaml
4.publish 配置必须选择generic，url只支持80端口(好像是auto-updater的bug)
5.目前是静默下载和安装