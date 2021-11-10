---
title: 1、go语言安装与LiteIDE的配置
author: zsc
date: 2018-01-05
tags: ["go"]
---

先下载 [liteide](https://sourceforge.net/projects/liteide/?source=typ_redirect) 和[go](https://www.golangtc.com/download) 安装包， 由于我的是win10 ，直接下载win的，直接点击下一步就可以安装go语言了，他会自动安装到C：\go 我设置为F :\go





在cmd 命令中输入 ：go env  显示

```
set GOARCH=amd64                			  #    cpu架构   
set GOBIN=                              	# 工作目录下的bin文件夹  
set GOEXE=.exe                    			 # 生成可执行文件的后缀  
set GOHOSTARCH=amd64           	  	  		#交叉编译参数  
set GOHOSTOS=windows          			  	#交叉编译参数   
set GOOS=windows          				  #当前系统名称  
set GOPATH=C:\Users\zsc\go    			 # 我的工作目录  
set GORACE=                           			  #  
set GOROOT=F:\go		                   	 #go的安装目录  
set GOTOOLDIR=F:\go\pkg\tool\windows_amd64   #   
set GCCGO=gccgo  
set CC=gcc  
set GOGCCFLAGS=-m64 -mthreads -fmessage-length=0 -fdebug-prefix-map=C:\Users\zsc\AppData\Local\Temp\go-build974907835=/tmp/go-build -gno-record-gcc-switches
set CXX=g++  
set CGO_ENABLED=1   
set CGO_CFLAGS=-g -O2  
set CGO_CPPFLAGS=  
set CGO_CXXFLAGS=-g -O2  
set CGO_FFLAGS=-g -O2  
set CGO_LDFLAGS=-g -O2  
set PKG_CONFIG=pkg-config  
```

好像这后面的可以不用管，去电脑的环境变量里面新增

![go1-2](https://gitee.com/zscqsmy/blogimg/raw/master/img/go1-2.png)

解压下载好的liteide，把解压后的目录放在go安装的目录中（我的安装go目录为F：\go\）进入F:\go\liteide\bin目录找到liteide.exe 文件，双击进入

接着配置liteide工具，点击【工具】--【选择环境】--【win64】 ，，再次进入【工具】--【编辑当前环境】

![go1-3](https://gitee.com/zscqsmy/blogimg/raw/master/img/go1-3.png)

好像就成功了

 再次检查一下，进入cmd 输入 go env 与go version，go的版本1.9.2，成功

![go1-4](https://gitee.com/zscqsmy/blogimg/raw/master/img/go1-4.png)

进入LiteIDE测试

点击【文件】--新建---GO1 command Project   即可，输入go程序，

```
// week1 project main.go
package main

import "fmt"

func createMessage(name string) string {
	if len(name) == 0 {
		return "Hello world"
	} else {
		return "Hello " + name
	}
}
func main() {
	fmt.Println(createMessage("Tom"))
	fmt.Println(createMessage(""))
}

```

先编译（ctrl+B）---在运行(ctrl+alt+R)，就能看到结果：（和c的运行一样）

![go1-5](https://gitee.com/zscqsmy/blogimg/raw/master/img/go1-5.png)

对静态语言不熟悉，几乎小白，见谅！